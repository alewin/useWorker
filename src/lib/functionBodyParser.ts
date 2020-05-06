/**
 *
 * Convert function to a string ang gets body expressions
 * this expressions' strings will then executed on worker creation.
 *
 * @param {Array.<String>}} deps array of string
 * @returns {String} a string composed by the concatenation of the array
 * elements "deps" and "importScripts".
 *
 * @example
 * functionBodyParser(function () {let a = 2}) // return let a = 2)
 */
const functionBodyParser = (fn?: Function) => {
  const functionString = fn?.toString()

  return functionString?.slice(
    functionString.indexOf('{') + 1,
    functionString.lastIndexOf('}')
  )
}

export default functionBodyParser
