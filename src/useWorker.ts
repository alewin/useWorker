import React from 'react'
import createWorkerBlobUrl from './lib/createWorkerBlobUrl'
import WORKER_STATUS from './lib/status'

type Options = {
  timeout?: number;
  dependencies?: string[];
}

const PROMISE_RESOLVE = 'resolve'
const PROMISE_REJECT = 'reject'
const DEFAULT_OPTIONS: Options = {
  timeout: undefined,
  dependencies: [],
}

/**
 *
 * @param {Function} fn the function to run with web worker
 * @param {Object} options useWorker option params
 */
export const useWorker = <T extends (...fnArgs: any[]) => any>(fn: T, options: Options = DEFAULT_OPTIONS) => {
  const [workerStatus, setWorkerStatus] = React.useState<WORKER_STATUS>(WORKER_STATUS.PENDING)
  const worker = React.useRef<Worker & { _url?: string }>()
  const promise = React.useRef<{ [PROMISE_REJECT]?: (result: ReturnType<T> | ErrorEvent) => void;[PROMISE_RESOLVE]?: (result: ReturnType<T>) => void }>({})
  const timeoutId = React.useRef<number>()

  const killWorker = (status = WORKER_STATUS.PENDING) => {
    if (worker.current && worker.current._url) {
      worker.current.terminate()
      URL.revokeObjectURL(worker.current._url)
      promise.current = {}
      worker.current = undefined
      window.clearTimeout(timeoutId.current)
      setWorkerStatus(status)
    }
  }

  React.useEffect(() => () => {
    killWorker()
  }, [])

  const generateWorker = () => {
    const {
      dependencies = DEFAULT_OPTIONS.dependencies,
      timeout = DEFAULT_OPTIONS.timeout,
    } = options
    const blobUrl = createWorkerBlobUrl(fn, dependencies!)
    const newWorker: Worker & { _url?: string } = new Worker(blobUrl)
    newWorker._url = blobUrl

    newWorker.onmessage = (e: MessageEvent) => {
      const [status, result] = e.data as [WORKER_STATUS, ReturnType<T>]

      switch (status) {
        case WORKER_STATUS.SUCCESS:
          promise.current[PROMISE_RESOLVE]!(result)
          killWorker(status)
          break
        default:
          promise.current[PROMISE_REJECT]!(result)
          killWorker(WORKER_STATUS.ERROR)
          break
      }
    }

    newWorker.onerror = (e: ErrorEvent) => {
      promise.current[PROMISE_REJECT]!(e)
      killWorker(WORKER_STATUS.ERROR)
    }

    if (timeout) {
      timeoutId.current = window.setTimeout(() => {
        killWorker(WORKER_STATUS.TIMEOUT_EXPIRED)
      }, timeout)
    }
    return newWorker
  }

  const callWorker = (...fnArgs: Parameters<T>) => new Promise<ReturnType<T>>((resolve, reject) => {
    promise.current = {
      [PROMISE_RESOLVE]: resolve,
      [PROMISE_REJECT]: reject,
    }

    worker.current!.postMessage([[...fnArgs]])

    setWorkerStatus(WORKER_STATUS.RUNNING)
  })

  const workerHook = (...fnArgs: Parameters<T>) => {
    if (workerStatus === WORKER_STATUS.RUNNING) {
      /* eslint-disable-next-line no-console */
      console.error('[useWorker] You can only run one instance of the worker at a time, if you want to run more than one in parallel, create another instance with the hook useWorker(). Read more: https://github.com/alewin/useWorker')
      return Promise.reject()
    }

    worker.current = generateWorker()
    return callWorker(...fnArgs)
  }

  return [workerHook, workerStatus, killWorker] as [typeof workerHook, WORKER_STATUS, typeof killWorker]
}
