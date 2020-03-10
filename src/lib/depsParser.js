const depsParser = deps => {
  const depsString = (deps.map(dep => `${dep}`)).toString()
  return `importScripts('${depsString}')`
}

export default depsParser
