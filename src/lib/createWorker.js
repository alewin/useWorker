import jobRunner from "./jobRunner";

const createWorker = fn => {
  const blobCode = `onmessage=(${jobRunner})(${fn})`;
  const blob = new Blob([blobCode], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  return new Worker(url);
};

export default createWorker;
