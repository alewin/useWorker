/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
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
  const [workerStatus, setWorkerStatus] = React.useState([PENDING])
  const workerCounter = React.useRef(0)
  const workers = React.useRef([])
  const workersPromises = React.useRef([])

  /**
   * Questa funzione attacca il listener per ascoltare l'andamento del worker e richiamerà
   * onSuccess se la funzione da eseguire all'interno del web worker è andata a buon fine
   * oppure onError se qualcosa è andato storto
   *
   * @param {*} workerId index of workers array
   * @param {*} onSuccess function to call when the worker finish with success status
   * @param {*} onError function to call when the worker finish with an error
   */
  const createNewInstance = () => {
    const [newWorker, workerBlobUrl] = createWorker(fn)
    const newWorkerId = workerCounter.current

    workers.current[newWorkerId] = {}
    workers.current[newWorkerId]._workerBlobUrl = workerBlobUrl
    workers.current[newWorkerId].onmessage = e => {
      const [status, result] = e.data

      switch (status) {
        case SUCCESS:
          workersPromises.current[newWorkerId][PROMISE_RESOLVE](result)
          setWorkerStatus(SUCCESS)
          break
        default:
          workersPromises.current[newWorkerId][PROMISE_REJECT](result)
          setWorkerStatus(ERROR)
          break
      }
    }

    workers.current.push(newWorker)
    workerCounter.current += 1

    return [newWorkerId, newWorker]
  }

  const callWorker = (workerId, ...fnArgs) => new Promise((resolve, reject) => {
    workersPromises.current.push({ [PROMISE_RESOLVE]: resolve, [PROMISE_REJECT]: reject })
    workers.current[workerId].postMessage([[...fnArgs]])
    setWorkerStatus({ ...workerStatus, [workerId]: RUNNING })
  })

  const killWorker = workerId => {
    workers.current[workerId].terminate()
    setWorkerStatus({ ...workerStatus, [workerId]: PENDING })
    URL.revokeObjectURL(workers.current[workerId]._workerBlobUrl)
  }

  const workerInstanceFun = (...fnArgs) => {
    const [workerId, worker] = createNewInstance()
    worker.prototype.call = () => callWorker(workerId, ...fnArgs)
    worker.kill = () => killWorker(workerId)
    return worker
  }

  const killWorkers = () => {
    for (let i = 0; i < workers.current.length; i += 1) {
      workers.current[i].terminate()
      setWorkerStatus(PENDING)
    }
  }

  return [workerInstanceFun, workerStatus, killWorkers]
}

export default useWorker
