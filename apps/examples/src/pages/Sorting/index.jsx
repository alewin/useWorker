import { WORKER_STATUS, useWorker } from '@koale/useworker'
import React from 'react'
import toast from 'react-hot-toast'

import bubbleSort from './algorithms/bubbleSort.js'

const numbers = [...Array(50000)].map(() => Math.floor(Math.random() * 1000000))

function App() {
  const [sortStatus, setSortStatus] = React.useState(false)
  const [sortWorker, { status: sortWorkerStatus, kill: killWorker }] =
    useWorker(bubbleSort)

  React.useEffect(() => {
    console.log('WORKER:', sortWorkerStatus)
  }, [sortWorkerStatus])

  const onSortClick = () => {
    setSortStatus(true)
    const result = bubbleSort(numbers)
    setSortStatus(false)
    toast.success('Finished: Sort')
    console.log('Bubble Sort', result)
  }

  const onWorkerSortClick = () => {
    sortWorker(numbers).then((result) => {
      console.log('Bubble Sort useWorker()', result)
      toast.success('Finished: Sort using useWorker.')
    })
  }

  return (
    <div>
      <section className="App-section">
        <button
          type="button"
          disabled={sortStatus}
          className="App-button"
          onClick={() => onSortClick()}
        >
          {sortStatus ? `Loading...` : `Bubble Sort`}
        </button>
        <button
          type="button"
          disabled={sortWorkerStatus === WORKER_STATUS.RUNNING}
          className="App-button"
          onClick={() => onWorkerSortClick()}
        >
          {sortWorkerStatus === WORKER_STATUS.RUNNING
            ? `Loading...`
            : `Bubble Sort useWorker()`}
        </button>
        {sortWorkerStatus === WORKER_STATUS.RUNNING ? (
          <button
            type="button"
            className="App-button"
            onClick={() => killWorker()}
          >
            Kill Worker
          </button>
        ) : null}
      </section>
      <section className="App-section">
        <span style={{ color: 'white' }}>
          Open DevTools console to see the results.
        </span>
      </section>
    </div>
  )
}

export default App
