---
"@koale/useworker": patch
---

Surface an actionable `WorkerScopeError` (with a console hint and docs link) when a
worker throws a `ReferenceError: <x> is not defined`. This is the common production-build
failure where a transpiler/minifier (Babel, Terser, …) hoists helper functions out of the
serialized worker function. The original `ErrorEvent` is preserved on `error.originalEvent`,
and the README "Known issues" section now explains the cause and fixes.
