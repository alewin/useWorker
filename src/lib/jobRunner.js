const jobRunner = userFunc => e => {
  const [userFuncArgs] = e.data;
  const workerPromise = Function.prototype.apply.bind(userFunc, null);

  return Promise.resolve(workerPromise(userFuncArgs))
    .then(result => {
      postMessage(["SUCCESS", result]);
    })
    .catch(error => {
      postMessage(["ERROR", error]);
    });
};

export default jobRunner;
