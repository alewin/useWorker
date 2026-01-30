/**
 *
 * Concatenates the remote dependencies into a comma separated string.
 * this string will then be passed as an argument to the "importScripts" function
 *
 * @param {Array.<String>} deps array of string
 * @param {Array.<Function>} localDeps array of function
 * @returns {String} a string composed by the concatenation of the array
 * elements "deps" and "importScripts".
 *
 * @example
 * remoteDepsParser(['http://js.com/1.js', 'http://js.com/2.js']) // importScripts('http://js.com/1.js', 'http://js.com/2.js')
 */
const remoteDepsParser = (deps: string[], localDeps: Function[]) => {
  if (deps.length === 0 && localDeps.length === 0) return "";

  const depsString = deps.map((dep) => `'${dep}'`).toString();
  const depsFunctionString = localDeps
    .filter((dep) => typeof dep === "function")
    .map((fn) => {
      const str = fn.toString();
      if (str.trim().startsWith("function")) {
        return str;
      } else {
        const name = fn.name;
        return `const ${name} = ${str}`;
      }
    })
    .join(";");
  const importString = `importScripts(${depsString});`;
  return `${
    depsString.trim() === "" ? "" : importString
  } ${depsFunctionString}`;
};

export default remoteDepsParser;
