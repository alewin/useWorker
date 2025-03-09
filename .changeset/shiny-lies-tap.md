---
"@koale/useworker": patch
---

- fix: mark worker as not running immediately after being killed ([#171](https://github.com/alewin/useWorker/pull/171))

Allows immediate worker restart after killing by updating running status synchronously instead of waiting for next render cycle.

