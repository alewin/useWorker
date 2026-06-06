
<h1 align="center">
  <br>
  <img width="300px" src="logo.png" alt="useWorker"
    title="useWorker() Use web workers with react hook" />
  <br>
</h1>

<h2 align="center">
  Use web workers with react hook
  <br />
  https://useworker.js.org/  
  <a
    href="https://twitter.com/intent/tweet?text=useWorker - Use web workers with react hooks&url=https://github.com/alewin/useWorker&via=alessiokoci&hashtags=react,useworker,hooks,javascript">
    <br />
    <img alt="Tweet" src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social" />
  </a>

</h2>



<h3 align="center">
  <img alt="GitHub" src="https://img.shields.io/npm/dm/@koale/useworker" />
  <img alt="size" src="https://img.shields.io/bundlephobia/minzip/@koale/useworker/2.1.0" />
  <img alt="GitHub" src="https://img.shields.io/npm/l/@koale/useworker" />
 <img src="https://badgen.net/npm/types/tslib" alt="TypeScript Support" title="TypeScript Support" data-canonical-src="https://badgen.net/badge/TypeScript/Support" style="max-width:100%;">
</h3>

---

## 🎨 Features

- Run expensive function **without blocking UI** ([Show live gif](https://github.com/alewin/useWorker/issues/2))
- Supports **Promises** pattern instead of event-messages
- Size: less than `3KB`!
- Clear [API](https://useworker.js.org/docs/api-useworker#options-api) using hook
- Typescript support
- Garbage collector web worker instance
- [Remote dependencies](https://useworker.js.org/docs/api-useworker#options-api) option
- [timeout](https://useworker.js.org/docs/api-useworker#options-api) option

---

## 💾 [Install](https://www.npmjs.com/package/@koale/useworker)

- **@latest**

```bash
npm install --save @koale/useworker
```

---

## 🔨 Import

```jsx
import { useWorker, WORKER_STATUS } from "@koale/useworker";
```

---

## 📙 Documents

- [Getting Started](https://useworker.js.org/docs/introduction)
- [APIs](https://useworker.js.org/docs/api-useworker/)
- [Examples](https://useworker.js.org/docs/examples/examples-sort)
- [Limitations](https://useworker.js.org/docs/limitations)

---

## 🍞 Demo

- [Sorting](https://icji4.csb.app/sorting): Sorting 50000 random numbers
- [Csv](https://icji4.csb.app/csv): Generate Csv, Parse Csv, Convert to JSON
- [External Dependencies](https://icji4.csb.app/external) Use external scripts inside WebWorker

---

## ⚙ Web Workers

Before you start using this [hook](https://www.npmjs.com/package/@koale/useworker), I suggest you to read the [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) documentation.

---

## 🐾 Usage

```jsx
import React from "react";
import { useWorker } from "@koale/useworker";

const numbers = [...Array(5000000)].map((e) => ~~(Math.random() * 1000000));
const sortNumbers = (nums) => nums.sort();

const Example = () => {
  const [sortWorker] = useWorker(sortNumbers);

  const runSort = async () => {
    const result = await sortWorker(numbers); // non-blocking UI
    console.log(result);
  };

  return (
    <button type="button" onClick={runSort}>
      Run Sort
    </button>
  );
};
```

---

## 🖼 Live Demo

<img alt="useworker demo" src="https://user-images.githubusercontent.com/980844/82120716-70151e00-9788-11ea-8f8d-07b06a13dde2.gif" />

---

## 🐾 Examples

[![Edit white-glitter-icji4](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/white-glitter-icji4?fontsize=14&hidenavigation=1&theme=dark)

More examples: https://github.com/alewin/useWorker/tree/develop/example

---

## 🔧 Roadmap

- [x] Kill Web Worker
- [x] Reactive web worker status
- [x] Add timeout option
- [x] Import and use remote script inside `useWorker` function
- [x] support [Transferable Objects](https://developer.mozilla.org/en-US/docs/Glossary/Transferable_objects)
- [x] Testing useWorker [#41](https://github.com/alewin/useWorker/issues/41)
- [x] Import and use local script inside `useWorker` function [#37](https://github.com/alewin/useWorker/issues/37)
- [ ] useWorkers Hook [#38](https://github.com/alewin/useWorker/issues/38)
- [ ] useWorkerFile Hook [#93](https://github.com/alewin/useWorker/issues/93)

---

## 🤔 Motivation and Limitations

Most react projects are initialized through [Create React App](https://github.com/facebook/create-react-app).
CRA unfortunately does not offer support for webworkers, unless you eject and change the webpack configuration manually.

This library allows you to use web workers without having to change the CRA configuration, which is why there are often limitations or particular workarounds.

If you are interested in changing the webpack configuration to manually manage your workers, see: [worker-loader](https://github.com/webpack-contrib/worker-loader)

---

## Known issues

#### `ReferenceError: <x> is not defined` in production builds

A common report (e.g. `Uncaught ReferenceError: f is not defined`) is a worker that
works in development (`npm start`) but breaks in a production build such as
Create React App.

Since the approach of this library is moving the entire function passed to the Hook
into a worker (via `Function.prototype.toString`), the function **must be
self-contained**. In production, transpilers/minifiers such as Babel or Terser hoist
helper functions and rename them (often to single letters like `f`). Those helpers
live in your module scope and are **not** copied into the worker, so the serialized
function references identifiers that don't exist inside the worker — causing the
reference error.

To help diagnose this, `useWorker` now rejects with a `WorkerScopeError` carrying an
actionable message (and logs it to the console) whenever a worker throws this kind of
`ReferenceError`. The original `ErrorEvent` is preserved on `error.originalEvent`.

```js
import { useWorker, WorkerScopeError } from "@koale/useworker";

const [doWork] = useWorker(myFn);

try {
  await doWork(data);
} catch (error) {
  if (error instanceof WorkerScopeError) {
    // the function isn't self-contained — see error.message
  }
}
```

##### How to fix it

- Keep the function self-contained: don't reference outer-scope variables, imports, or
  helpers defined elsewhere in your module.
- Load external scripts through the `remoteDependencies` option (they're added via
  `importScripts` inside the worker) instead of closing over imported values.
- As a last resort, declare the function as a string so the transpiler can't rewrite it:

```js
const sum = new Function(`a`, `b`, `return a + b`);
```

---

## 🌏 Contribute? Bug? New Feature?

The library is experimental so if you find a **bug** or would like to request a new **feature**, open an [issue](https://github.com/alewin/useWorker/issues/new)

---

## 💡 Similar Projects

- [greenlet](https://github.com/developit/greenlet/)
- [react-hooks-worker](https://github.com/dai-shi/react-hooks-worker)

---

## 💻 Mantainers

- [@naorpeled](https://github.com/naorpeled)
- [@alewin](https://github.com/alewin)
- [@zant](https://github.com/zant)

## 💻 Contributors

- Thanks to:
- [@zant](https://github.com/zant) (test, CI, `RFC`, bugfixes, `localdependencies` feature, ...)
- [@101arrowz](https://github.com/101arrowz) ( `isoworker` packages proposal )
- [@z4o4z](https://github.com/z4o4z) (`Typescript` implementation, Discussion of `RFC`)
- [@IljaDaderko](https://github.com/IljaDaderko) (`Typescript` support, Discussion of `RFC`)
- [@ophirg](https://github.com/ophirg) (`Typescript` support)
- [@Pigotz](https://github.com/Pigotz) (Discussion of `RFC`)
- [@gubo97000](https://github.com/gubo97000) (Fix [#108](https://github.com/alewin/useWorker/issues/108))

_How to contribute?_

Read [CONTRIBUTE.md](docs/CONTRIBUTE.md)

---

## 📜 License

[MIT](https://github.com/alewin/useWorker/blob/develop/LICENSE)

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/833cd6b2-6e74-47f0-aa85-5f14aea8ea35/deploy-status)](https://app.netlify.com/sites/useworker/deploys)
