import { WORKER_STATUS, useWorker } from "@koale/useworker";
import React, { useState } from "react";
import toast from "react-hot-toast";

const pow = (a) => a * a;

function App() {
  const [inputValue, setInputValue] = useState(2); // State for input value
  const [localDepsWorker, { status: localDepsWorkerStatus, kill: killWorker }] =
    useWorker((numbers) => pow(numbers), {
      autoTerminate: false,
      localDependencies: [pow],
    });

  React.useEffect(() => {
    console.log("WORKER:", localDepsWorkerStatus);
  }, [localDepsWorkerStatus]);

  const onWorkerSortClick = () => {
    // Use the inputValue from state
    localDepsWorker(Number(inputValue)).then((result) => {
      console.log("localdeps useWorker()", result);
      toast.success(
        "Finished: localdeps using useWorker." + `The result is ${result}`
      );
    });
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <section className="App-section">
        {/* Input field for dynamic value */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <pre>{"const pow = (a) => a * a;"}</pre>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a number"
            className="App-input"
          />
          <button
            type="button"
            disabled={localDepsWorkerStatus === WORKER_STATUS.RUNNING}
            className="App-button"
            onClick={() => onWorkerSortClick()}
          >
            {localDepsWorkerStatus === WORKER_STATUS.RUNNING
              ? `Loading...`
              : `LocalDeps useWorker()`}
          </button>
          {localDepsWorkerStatus === WORKER_STATUS.RUNNING ? (
            <button
              type="button"
              className="App-button"
              onClick={() => killWorker()}
            >
              Kill Worker
            </button>
          ) : null}
        </div>
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
