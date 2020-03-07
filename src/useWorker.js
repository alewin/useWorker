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
  const workerCounter = React.useRef(0)
  const workers = React.useRef([])
  const workersPromises = React.useRef([])
  // todo multiple workerStatus ?
  const addWorkerListener = (worker, id) => {
    worker.onmessage = e => {
      const [status, result] = e.data

      switch (status) {
        case SUCCESS:
          workersPromises.current[id][PROMISE_RESOLVE](result)
          setWorkerStatus(SUCCESS)
          break
        default:
          workersPromises.current[id][PROMISE_REJECT](result)
          setWorkerStatus(ERROR)
          break
      }
    }
  }

  const callWorker = (...fnArgs) => new Promise((resolve, reject) => {
    const newWorker = createWorker(fn)
    addWorkerListener(newWorker, workerCounter.current)
    workers.current.push(newWorker)

    workersPromises.current.push({
      [PROMISE_RESOLVE]: resolve,
      [PROMISE_REJECT]: reject,
    })

    workers.current[workerCounter.current].postMessage([[...fnArgs]])
    setWorkerStatus(RUNNING)

    workerCounter.current += 1
  })

  const killWorkers = () => {
    for (let i = 0; i < workers.current.length; i += 1) {
      workers.current[i].terminate()
      setWorkerStatus(PENDING)
    }
  }

  return [(...fnArgs) => callWorker(...fnArgs), workerStatus, killWorkers]
}

export default useWorker
