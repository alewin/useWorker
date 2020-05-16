/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from "react";
import { useWorker, WORKER_STATUS } from "@koale/useworker";
import { useToasts } from "react-toast-notifications";


const demoFunction = (arrayBuffer) => {
  var uInt8Array = new Uint8Array(arrayBuffer)
  for (let i = 0; i < uInt8Array.length; ++i) {
    uInt8Array[i] = 42;
  }
  return uInt8Array.buffer
}

function App() {
  const { addToast } = useToasts();

  const [transferableWorker, {
    status: transferableWorkerStatus,
    kill: killWorker
  }] = useWorker(demoFunction, { autoTerminate:false, transferable: 'auto'});

  React.useEffect(()=>{
    console.log("WORKER:", transferableWorkerStatus);
  }, [transferableWorkerStatus])

  const onWorkerSortClick = () => {
    // Create a 40MB "file" and fill it.
    var uInt8Array = new Uint8Array(1024 * 1024 * 40); // 40MB
    for (var i = 0; i < uInt8Array.length; ++i) {
      uInt8Array[i] = i;
    }
    transferableWorker(uInt8Array.buffer).then(result => {
      console.log("transferable useWorker()", result);
      addToast("Finished: transferable using useWorker.", { appearance: "success" });
    });
  };

  return (
    <div>
      <section className="App-section">

        <button
          type="button"
          disabled={transferableWorkerStatus === WORKER_STATUS.RUNNING}
          className="App-button"
          onClick={() => onWorkerSortClick()}
        >
          {transferableWorkerStatus === WORKER_STATUS.RUNNING
            ? `Loading...`
            : `Transferable useWorker()`}
        </button>
        {transferableWorkerStatus === WORKER_STATUS.RUNNING ? (
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
