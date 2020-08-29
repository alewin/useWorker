/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/**
 *
 * Parses an object and return a string with it items
 *
 * @param {Array.<String>}} deps array of string
 * @returns {String} a string representation of the object
 *
 */

const generateKeyValue = (key: string, value: string) => `${key}: ${value}`

function isObject(obj: any) {
  return obj === Object(obj)
}

const generateObjectKeyValues = (
  deps: object | [] | string | number,
): string | number | object => {
  if (Array.isArray(deps)) {
    return `[${String(deps.map((elem) => generateObjectKeyValues(elem)))}]`
  }

  if (isObject(deps)) {
    let depsString = ''
    const map = Object.entries(deps)
    for (const [key, value] of map) {
      if (typeof value === 'object') {
        depsString += `${key}: ${generateObjectKeyValues(value)}`
      } else if (Array.isArray(value)) {
        depsString += `${key}: ${generateObjectKeyValues(value)}`
      } else {
        depsString += generateKeyValue(key, value)
      }
      depsString += ','
    }
    return `{${depsString}}`
  }

  return typeof deps === 'string' ? `"${String(deps)}"` : deps
}

const localDepsParser = (deps: object) => `const utils = ${generateObjectKeyValues(deps)}`

export default localDepsParser
