import { createContext, dataPlaceholder } from "isoworker";
import jobRunner from "./jobRunner";
import remoteDepsParser from "./remoteDepsParser";
import { DepList, TRANSFERABLE_TYPE } from "./types";
/**
 * Converts the "fn" function into a worker that takes parameters from messages and returns via messages
 *
 * @param {Function} fn the function to run with web worker
 * @param {Array.<String>} deps array of strings, imported into the worker through "importScripts"
 *
 * @returns {Worker} a worker created via a blob url containing the code of "fn" as a string
 *
 * @example
 * createWorker((a,b) => a+b, [])
 * // return "onmessage=return Promise.resolve((a,b) => a + b)
 * .then(postMessage(['SUCCESS', result]))
 * .catch(postMessage(['ERROR', error])"
 */
const createWorker = (fn: Function, deps: string[], transferable: TRANSFERABLE_TYPE, localDeps: DepList) => {
  const [context, runtimeCode, transferables] = createContext(localDeps);
  const initMessage: unknown[] = [];
  let onInitMessage = "";

  for (let part of runtimeCode) {
    if (typeof part !== "string") {
      const partIndex = initMessage.push(part[1]) - 1;
      part = part[0].replace(dataPlaceholder, `event.data[${partIndex}]`);
    }
    onInitMessage += part;
  }

  const blobCode = `
    ${remoteDepsParser(deps)};
    ${context}
    onmessage = function(event) {
      ${onInitMessage}
      onmessage = (${jobRunner})({
        fn: (${fn}),
        transferable: '${transferable}'
      })
    }
  `;

  const blob = new Blob([blobCode], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const worker: Worker & { _url?: string } = new Worker(url);
  worker._url = url;
  worker.postMessage(initMessage, transferable === TRANSFERABLE_TYPE.AUTO ? (transferables as Transferable[]) : []);

  return worker;
};

export default createWorker;
