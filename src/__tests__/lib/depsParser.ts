import depsParser from '../../lib/depsParser'

describe('Test useWorker lib', () => {
  it('depsParser - empty dependencies', () => {
    const deps: string[] = []

    const inlineDeps = depsParser(deps)

    expect(inlineDeps).toBe('')
  })
  it('depsParser - one dependencies', () => {
    const deps: string[] = [
      'http://deps1.com/index.js',
    ]

    const inlineDeps = depsParser(deps)

    expect(inlineDeps).toBe("importScripts('http://deps1.com/index.js')")
  })
  it('depsParser - two dependencies', () => {
    const deps: string[] = [
      'http://deps1.com/index.js',
      'http://deps2.com/index.js',
    ]

    const inlineDeps = depsParser(deps)

    expect(inlineDeps).toBe("importScripts('http://deps1.com/index.js,http://deps2.com/index.js')")
  })
})
