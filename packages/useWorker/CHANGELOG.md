# @koale/useworker

## 4.1.2

### Patch Changes

- 89b3d50: - fix: reject promises for workers that are about to be killed ([#170](https://github.com/alewin/useWorker/pull/170))

  Reject promises for killed workers with AbortError to prevent memory leaks from dangling promises

- 89b3d50: - fix: mark worker as not running immediately after being killed ([#171](https://github.com/alewin/useWorker/pull/171))

  Allows immediate worker restart after killing by updating running status synchronously instead of waiting for next render cycle.

## 4.1.1

### Patch Changes

- revert(package.json): rollback Node engine change

## 4.1.0

### Minor Changes

- feat: add react 18 19 support
- fix: include sourcemaps in NPM published package #144
- fix: kill functionality #122

## 4.0.2

### Patch Changes

- fix: #108 ( multiple external dependencies )
