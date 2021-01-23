/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from "react";
import { useWorker, WORKER_STATUS } from "@koale/useworker";
import { useToasts } from "react-toast-notifications";

import csvToJson from "./parser/csvToJson";
import generateCsv from "./parser/generateCsv";

function App() {
  const { addToast } = useToasts();

  const [csvStatus, setCsvStatus] = React.useState(false);
  const [generateWorker] = useWorker(generateCsv, { autoTerminate: false });
  const [csvWorker, { status: csvWorkerStatus, kill: killWorker }] = useWorker(csvToJson);

  React.useEffect(()=>{
    console.log("WORKER:", csvWorkerStatus);
  }, [csvWorkerStatus])

  const onCsvClick = () => {
    const fakeCsv = generateCsv();
    setCsvStatus(true);
    const result = csvToJson(fakeCsv);
    setCsvStatus(false);
    addToast("Finished: Csv parsed", { appearance: "success" });
    console.log("Csv", result);
  };

  const onWorkerCsvClick = async () => {
    const fakeCsv = await generateWorker();
    csvWorker(fakeCsv).then(result => {
      console.log("Csv useWorker()", result);
      addToast("Finished: Csv parsed using useWorker()", {
        appearance: "success"
      });
    });
  };

  return (
    <div>
      <section className="App-section">
        <button
          type="button"
          disabled={csvStatus}
          className="App-button"
          onClick={() => onCsvClick()}
        >
          {csvStatus ? `Loading...` : `Csv to Json`}
        </button>
        <button
          type="button"
          disabled={csvWorkerStatus === WORKER_STATUS.RUNNING}
          className="App-button"
          onClick={() => onWorkerCsvClick()}
        >
          {csvWorkerStatus === WORKER_STATUS.RUNNING
            ? `Loading...`
            : `Csv to Json useWorker()`}
        </button>
        {csvWorkerStatus === WORKER_STATUS.RUNNING ? (
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
