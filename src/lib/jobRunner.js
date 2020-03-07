import WORKER_STATUS from './workerconst'

const jobRunner = userFunc => e => {
  const [userFuncArgs] = e.data;

  return Promise.resolve(userFunc(...userFuncArgs))
    .then(result => {
      postMessage([WORKER_STATUS.SUCCESS, result]);
    })
    .catch(error => {
      postMessage([WORKER_STATUS.ERROR, error]);
    });
};

export default jobRunner;
