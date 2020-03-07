import React from 'react'
import createWorker from './lib/createWorker'
import {
  PENDING,
  SUCCESS,
  ERROR,
  RUNNING,
} from './lib/workerconst'

const PROMISE_RESOLVE = 'resolve'
const PROMISE_REJECT = 'reject'

const useWorker = fn => {
  const [workerStatus, setWorkerStatus] = React.useState(PENDING)
  const worker = React.useRef({})
  const promise = React.useRef({})

  React.useEffect(() => {
    const newWorker = createWorker(fn)
    newWorker.onmessage = e => {
      const [status, result] = e.data

      switch (status) {
        case SUCCESS:
          promise.current[PROMISE_RESOLVE](result)
          setWorkerStatus(SUCCESS)
          break
        default:
          promise.current[PROMISE_REJECT](result)
          setWorkerStatus(ERROR)
          break
      }
    }

    worker.current = newWorker
  }, [])

  const callWorker = React.useCallback(fnArgs => new Promise((resolve, reject) => {
    promise.current = {
      [PROMISE_RESOLVE]: resolve,
      [PROMISE_REJECT]: reject,
    }

    worker.current.postMessage([[fnArgs]])
    setWorkerStatus(RUNNING)
  }), [])

  const killWorker = () => {
    worker.current.terminate()
    setWorkerStatus(PENDING)
  }

  return [fnArgs => callWorker(fnArgs), workerStatus, killWorker]
}

export default useWorker
