import React from "react";
import createWorker from "./lib/createWorker";

const PROMISE_RESOLVE = "resolve";
const PROMISE_REJECT = "reject";
const WORKER_STATUS = require("./lib/workerconst");

const useWorker = fn => {
  const worker = React.useRef({});
  const [workerStatus, setWorkerStatus] = React.useState(WORKER_STATUS.PENDING);
  const promise = React.useRef({});

  React.useEffect(() => {
    const newWorker = createWorker(fn);
    newWorker.onmessage = e => {
      const [status, result] = e.data;

      switch (status) {
        case WORKER_STATUS.SUCCESS:
          promise.current[PROMISE_RESOLVE](result);
          setWorkerStatus(WORKER_STATUS.SUCCESS);
          break;
        default:
          promise.current[PROMISE_REJECT](result);
          setWorkerStatus(WORKER_STATUS.ERROR);
          break;
      }
    };

    worker.current = newWorker;
  }, []);

  const callWorker = React.useCallback(fnArgs => {
    return new Promise((resolve, reject) => {
      promise.current = {
        [PROMISE_RESOLVE]: resolve,
        [PROMISE_REJECT]: reject
      };

      worker.current.postMessage([[fnArgs]]);
      setWorkerStatus(WORKER_STATUS.RUNNING);
    });
  }, []);

  const killWorker = () => {
    worker.current.terminate();
    setWorkerStatus(WORKER_STATUS.PENDING);
  };

  return [fnArgs => callWorker(fnArgs), workerStatus, killWorker];
};

export default useWorker;
export { WORKER_STATUS };
