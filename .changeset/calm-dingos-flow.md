---
"@koale/useworker": patch
---

- fix: reject promises for workers that are about to be killed ([#170](https://github.com/alewin/useWorker/pull/170))

Reject promises for killed workers with AbortError to prevent memory leaks from dangling promises
