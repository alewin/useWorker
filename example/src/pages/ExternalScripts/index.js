/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from "react";
import { useWorker, WORKER_STATUS } from "@koale/useworker";
import { useToasts } from "react-toast-notifications";

import sortDates from "./algorithms/sortDates";

const dates = [...Array(100000)].map(
  () => new Date(1995, Math.floor(Math.random() * 2000), 6, 2)
);

function App() {
  const { addToast } = useToasts();

  const [sortStatus, setSortStatus] = React.useState(false);
  const [sortWorker, sortWorkerStatus, killWorker] = useWorker(sortDates, {
    timeout: 5000,
    dependencies: [
      "https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.js"
    ]
  });

  console.log("WORKER:", sortWorkerStatus);

  const onSortClick = () => {
    setSortStatus(true);
    const result = sortDates(dates);
    setSortStatus(false);
    addToast("Finished: Sort", { appearance: "success" });
    console.log("Buble Sort", result);
  };

  const onWorkerSortClick = () => {
    sortWorker(dates).then(result => {
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
          {sortStatus ? `Loading...` : `Sort Dates`}
        </button>
        <button
          type="button"
          disabled={sortWorkerStatus === WORKER_STATUS.RUNNING}
          className="App-button"
          onClick={() => onWorkerSortClick()}
        >
          {sortWorkerStatus === WORKER_STATUS.RUNNING
            ? `Loading...`
            : `Sort Dates useWorker()`}
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
