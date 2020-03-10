import jobRunner from './jobRunner'

const createWorkerBlobUrl = fn => {
  const blobCode = `onmessage=(${jobRunner})(${fn})`
  const blob = new Blob([blobCode], { type: 'text/javascript' })
  const url = URL.createObjectURL(blob)
  return url
}

export default createWorkerBlobUrl
