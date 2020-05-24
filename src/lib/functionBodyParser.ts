/**
 *
 * Convert function to a string ang gets body expressions
 * this expressions' strings will then be inserted in the worker blob
 *
 * @param {Function} [] A function whose will be extracted
 * @returns {String} The function's body
 *
 * @example
 * functionBodyParser(function () {let a = 2}) // return let a = 2)
 */
const functionBodyParser = (fn?: Function): string => {
  if (!fn) return ''

  const functionString = fn?.toString()

  return functionString?.slice(
    functionString.indexOf('{') + 1,
    functionString.lastIndexOf('}')
  )
}

export default functionBodyParser
