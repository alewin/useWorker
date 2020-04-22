/* eslint-disable no-restricted-syntax */
/**
 *
 * Concatenates the dependencies into a comma separated string.
 * this string will then be passed as an argument to the "importScripts" function
 *
 * @param {Array.<String | Function>}} deps array of string or function
 * @returns {String} a string composed by the concatenation of the array
 * elements "deps" and "importScripts" and inline function.
 *
 * @example
 * depsParser(['demo1', 'demo2',]) // return importScripts('demo1, demo2')
 */
const depsParser = (deps: (string | Function)[]) => {
  if (deps.length === 0) return ''

  let localDep = ''
  let remoteDep = ''

  for (const dep of deps) {
    if (typeof dep === 'function') {
      localDep += ` ${dep.toString()} `
    }
    if (typeof dep === 'string') {
      remoteDep += `${dep}`
    }
  }

  remoteDep = remoteDep ? `importScripts('${remoteDep}')` : ''
  return `${remoteDep} ${localDep}`
}

export default depsParser
