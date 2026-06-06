import assert from 'node:assert/strict'
import test from 'node:test'
import {
  enhanceWorkerError,
  isTranspileScopeError,
  WorkerScopeError,
} from '../dist/index.mjs'

test('isTranspileScopeError detects ReferenceError messages', () => {
  assert.equal(
    isTranspileScopeError('Uncaught ReferenceError: f is not defined'),
    true,
  )
  assert.equal(isTranspileScopeError('ReferenceError: x is not defined'), true)
})

test('isTranspileScopeError ignores unrelated messages', () => {
  assert.equal(isTranspileScopeError('TypeError: x is not a function'), false)
  assert.equal(isTranspileScopeError('Script error.'), false)
  assert.equal(isTranspileScopeError(undefined), false)
  assert.equal(isTranspileScopeError(42), false)
})

test('enhanceWorkerError upgrades reference errors with actionable guidance', () => {
  const event = { message: 'Uncaught ReferenceError: f is not defined' }
  const result = enhanceWorkerError(event)

  assert.ok(result instanceof WorkerScopeError)
  assert.equal(result.name, 'WorkerScopeError')
  // keeps the original message...
  assert.match(result.message, /f is not defined/)
  // ...and adds the actionable hint + docs link
  assert.match(result.message, /\[useWorker\]/)
  assert.match(result.message, /remoteDependencies/)
  assert.match(result.message, /github\.com\/alewin\/useWorker#known-issues/)
  // preserves the original event for backward compatibility
  assert.equal(result.originalEvent, event)
})

test('enhanceWorkerError leaves unrelated errors untouched', () => {
  const event = { message: 'TypeError: x is not a function' }
  const result = enhanceWorkerError(event)

  assert.equal(result, event)
  assert.ok(!(result instanceof WorkerScopeError))
})
