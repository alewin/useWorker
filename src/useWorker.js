/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React from 'react'
import createWorkerBlobUrl from './lib/createWorkerBlobUrl'
import {
  PENDING,
  SUCCESS,
  ERROR,
  RUNNING,
} from './lib/workerconst'

const PROMISE_RESOLVE = 'resolve'
const PROMISE_REJECT = 'reject'

const useWorker = (fn, options = {}) => {
  const [workerStatus, setWorkerStatus] = React.useState(PENDING)
  const worker = React.useRef({})
  const promise = React.useRef({})

  const killWorker = (status = PENDING) => {
    worker.current.terminate()
    URL.revokeObjectURL(worker.current._url)
    promise.current = {}
    worker.current = {}
    setWorkerStatus(status)
  }

  const generateWorker = () => {
    const { dependencies } = options
    const blobUrl = createWorkerBlobUrl(fn, dependencies)
    const newWorker = new Worker(blobUrl)
    newWorker._url = blobUrl

    newWorker.onmessage = e => {
      const [status, result] = e.data

      switch (status) {
        case SUCCESS:
          promise.current[PROMISE_RESOLVE](result)
          killWorker(SUCCESS)
          break
        default:
          promise.current[PROMISE_REJECT](result)
          killWorker(ERROR)
          break
      }
    }
    return newWorker
  }

  const callWorker = (...fnArgs) => new Promise((resolve, reject) => {
    promise.current = {
      [PROMISE_RESOLVE]: resolve,
      [PROMISE_REJECT]: reject,
    }

    worker.current.postMessage([[...fnArgs]])
    setWorkerStatus(RUNNING)
  })

  const workerHook = (...fnArgs) => {
    if (workerStatus === RUNNING) {
      console.error('[useWorker] You can only run one instance of the worker at a time, if you want to run more than one in parallel, create another instance with the hook useWorker(). Read more: https://github.com/alewin/useWorker')
      return Promise.reject()
    }

    worker.current = generateWorker()
    return callWorker(...fnArgs)
  }

  return [workerHook, workerStatus, killWorker]
}

export default useWorker
