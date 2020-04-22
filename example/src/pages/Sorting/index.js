/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from "react";
import { useWorker, WORKER_STATUS } from "@koale/useworker";
import { useToasts } from "react-toast-notifications";

import bubleSort from "./algorithms/bublesort";

const numbers = [...Array(50000)].map(() =>
  Math.floor(Math.random() * 1000000)
);

function App() {
  const { addToast } = useToasts();

  const [sortStatus, setSortStatus] = React.useState(false);
  const [sortWorker, {
    status: sortWorkerStatus,
    kill: killWorker
  }] = useWorker(bubleSort);

  React.useEffect(()=>{
    console.log("WORKER:", sortWorkerStatus);
  }, [sortWorkerStatus])

  const onSortClick = () => {
    setSortStatus(true);
    const result = bubleSort(numbers);
    setSortStatus(false);
    addToast("Finished: Sort", { appearance: "success" });
    console.log("Buble Sort", result);
  };

  const onWorkerSortClick = () => {
    sortWorker(numbers).then(result => {
      console.log("Buble Sort useWorker()", result);
      addToast("Finished: Sort using useWorker.", { appearance: "success" });
    });
  };

  return (
    <div>
      <section className="App-section">
        <button
          type="button"
          disabled={sortStatus}
          className="App-button"
          onClick={() => onSortClick()}
        >
          {sortStatus ? `Loading...` : `Buble Sort`}
        </button>
        <button
          type="button"
          disabled={sortWorkerStatus === WORKER_STATUS.RUNNING}
          className="App-button"
          onClick={() => onWorkerSortClick()}
        >
          {sortWorkerStatus === WORKER_STATUS.RUNNING
            ? `Loading...`
            : `Buble Sort useWorker()`}
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
        <span style={{ color: "white" }}>
          Open DevTools console to see the results.
        </span>
      </section>
    </div>
  );
}

export default App;
