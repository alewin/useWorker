const KNOWN_ISSUES_URL = 'https://github.com/alewin/useWorker#known-issues'

/**
 * A worker error raised when the function passed to `useWorker` references
 * identifiers that don't exist inside the worker.
 *
 * This is almost always caused by a transpiler/minifier (Babel, Terser, …)
 * hoisting helper functions out of the user function. Since `useWorker`
 * serializes the function with `Function.prototype.toString`, those external
 * helpers are lost when the function is moved into the worker, producing a
 * cryptic `ReferenceError: <x> is not defined` at runtime.
 *
 * The original `ErrorEvent` is preserved on the `originalEvent` property so
 * existing consumers can keep reading `message`, `filename`, `lineno`, etc.
 */
export class WorkerScopeError extends Error {
  originalEvent?: ErrorEvent

  constructor(message: string, originalEvent?: ErrorEvent) {
    super(message)
    this.name = 'WorkerScopeError'
    this.originalEvent = originalEvent
  }
}

/**
 * Detects whether a worker error message looks like the "lost scope" problem
 * described above, i.e. a `ReferenceError` for an undefined identifier.
 *
 * @param {unknown} message the `message` of the worker `ErrorEvent`
 * @returns {boolean} true when the message matches a reference error
 */
export const isTranspileScopeError = (message: unknown): boolean =>
  typeof message === 'string' &&
  (/ReferenceError/.test(message) || /\bis not defined\b/.test(message))

/**
 * Builds an actionable error message that explains the most common cause of a
 * `ReferenceError` thrown inside a `useWorker` worker and how to fix it.
 *
 * @param {string} [original] the original worker error message
 * @returns {string} the augmented, self-explanatory message
 */
export const buildTranspileScopeErrorMessage = (original?: string): string =>
  `${original || 'A worker error occurred'}\n\n` +
  '[useWorker] The function passed to useWorker() referenced something that ' +
  "doesn't exist inside the worker. This typically happens in production " +
  'builds (e.g. Create React App) when a transpiler/minifier such as Babel ' +
  'or Terser hoists helper functions out of your function — they are lost ' +
  'when the function is serialized and moved into the worker.\n' +
  'Make sure the function is fully self-contained: avoid referencing ' +
  'outer-scope variables and imports, and pass external scripts via the ' +
  '`remoteDependencies` option instead.\n' +
  `See ${KNOWN_ISSUES_URL}`

/**
 * Returns a clearer, actionable error when a worker `ErrorEvent` looks like the
 * transpilation "lost scope" problem; otherwise returns the original event
 * unchanged so existing behavior is preserved.
 *
 * @param {ErrorEvent} event the worker `ErrorEvent`
 * @returns {ErrorEvent | WorkerScopeError} the original event or an enhanced error
 */
export const enhanceWorkerError = (
  event: ErrorEvent,
): ErrorEvent | WorkerScopeError => {
  if (isTranspileScopeError(event?.message)) {
    return new WorkerScopeError(
      buildTranspileScopeErrorMessage(event.message),
      event,
    )
  }
  return event
}
