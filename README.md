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
 <img src="https://camo.githubusercontent.com/6ef0a300e96da21e04d4d45bf54285202674498c/68747470733a2f2f62616467656e2e6e65742f62616467652f547970655363726970742f537570706f7274" alt="TypeScript Support" title="TypeScript Support" data-canonical-src="https://badgen.net/badge/TypeScript/Support" style="max-width:100%;">
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

- [Getting Started](https://useworker.netlify.com/docs/introduction/)
- [APIs](https://useworker.netlify.com/docs/api-useworker)
- [Examples](https://useworker.netlify.com/docs/examples/examples-sort)
- [Limitations](https://useworker.netlify.com/docs/limitations)

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

const numbers = [...Array(5000000)].map(e => ~~(Math.random() * 1000000));
const sortNumbers = nums => nums.sort();

const Example = () => {
  const [sortWorker] = useWorker(sortNumbers);

  const runSort = async () => {
    const result = await sortWorker(numbers); // non-blocking UI
    console.log("End.");
  };

  return (
    <button type="button" onClick={runSort}>
      Run Sort
    </button>
  );
};

```

---

## 🐾 Examples

[![Edit white-glitter-icji4](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/white-glitter-icji4?fontsize=14&hidenavigation=1&theme=dark)

More examples: https://github.com/alewin/useWorker/tree/develop/example

---

## 🔧 Roadmap

- [x] Kill Web Worker
- [x] Reactive web worker status
- [x] Add timeout option
- [x] import and use remote script inside `useWorker` function
- [x] support [Transferable Objects](https://developer.mozilla.org/en-US/docs/Web/API/Transferable)
- [ ] Testing useWorker [#41](https://github.com/alewin/useWorker/issues/41)
- [ ] import and use local script inside `useWorker` function [#37](https://github.com/alewin/useWorker/issues/37)
- [ ] useWorkers Hook [#38](https://github.com/alewin/useWorker/issues/38)


---


## 🤔 Motivation and Limitation
Most react projects are initialized through [Create React App](https://github.com/facebook/create-react-app).
CRA unfortunately does not offer support for webworkers, unless you eject and change the webpack configuration manually.

This library allows you to use web workers without having to change the CRA configuration, which is why there are often limitations or particular workarounds.

If you are interested in changing the webpack configuration to manually manage your workers, see: [worker-loader]( https://github.com/webpack-contrib/worker-loader)


---

## 🌏 Contribute? Bug? New Feature?

The library is experimental so if you find a **bug** or would like to request a new **feature**, open an [issue](https://github.com/alewin/useWorker/issues/new)

---

## 💡 Similar Project

- [greenlet](https://github.com/developit/greenlet/)
- [react-hooks-worker](https://github.com/dai-shi/react-hooks-worker)

---

## 💻 Contributors

- Thanks to:
- [@gonzachr](https://github.com/gonzachr) 
- [@IljaDaderko](https://github.com/IljaDaderko)
- [@Pigotz](https://github.com/Pigotz)
- [@z4o4z](https://github.com/z4o4z)

---

## 📜 License

MIT © [alewin](https://github.com/alewin)

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/833cd6b2-6e74-47f0-aa85-5f14aea8ea35/deploy-status)](https://app.netlify.com/sites/useworker/deploys)
