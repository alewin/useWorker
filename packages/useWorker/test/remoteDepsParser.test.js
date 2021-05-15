import remoteDepsParser from "../src/lib/remoteDepsParser";

const adder = (a, b) => a + b;

it("localDependencies", async () => {
  const deps = ['http://js.com/1.js', 'http://js.com/2.js']

  const result = remoteDepsParser(deps);

  assert.equal(result, "importScripts('http://js.com/1.js', 'http://js.com/2.js')"); 
});
