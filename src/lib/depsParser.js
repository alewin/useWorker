const depsParser = deps => {
  if (deps.length === 0) return ''

  const depsString = (deps.map(dep => `${dep}`)).toString()
  return `importScripts('${depsString}')`
}

export default depsParser
