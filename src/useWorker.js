import React from "react";
import createWorker from "./lib/createWorker";
import {
  PROMISE_RESOLVE,
  PROMISE_REJECT,
  STATUS_SUCCESS,
  STATUS_ERROR,
  STATUS_PENDING,
  STATUS_RUNNING
} from "./lib/const";

const useWorker = fn => {
  const worker = React.useRef({});
  const promise = React.useRef({});

  React.useEffect(() => {
    const newWorker = createWorker(fn);
    newWorker.onmessage = e => {
      const [status, result] = e.data;

      switch (status) {
        case STATUS_SUCCESS:
          promise.current[PROMISE_RESOLVE](result);
          worker.current.status = STATUS_SUCCESS;
          break;
        default:
          promise.current[PROMISE_REJECT](result);
          worker.current.status = STATUS_ERROR;
          break;
      }
    };

    worker.current = {
      worker: newWorker,
      status: STATUS_PENDING
    };
    return () => {
      worker.current.terminate();
    }
  }, []);

  const callWorker = React.useCallback(fnArgs => {
    return new Promise((resolve, reject) => {
      promise.current = {
        [PROMISE_RESOLVE]: resolve,
        [PROMISE_REJECT]: reject
      };

      worker.current.worker.postMessage([[fnArgs]]);
      worker.current.status = STATUS_RUNNING;
    });
  }, []);

  return [
    fnArgs => callWorker(fnArgs),
    worker.current.status,
    () => worker.current.worker.terminate()
  ];
};

export default useWorker;
