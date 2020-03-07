import { SUCCESS, ERROR } from "./workerconst";

const jobRunner = userFunc => e => {
  const [userFuncArgs] = e.data;

  return Promise.resolve(userFunc(...userFuncArgs))
    .then(result => {
      postMessage([SUCCESS, result]);
    })
    .catch(error => {
      postMessage([ERROR, error]);
    });
};

export default jobRunner;
