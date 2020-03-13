<h1 align="center">
  <br>
   <img src="logo.png" alt="ShopFully International Group" title="useWorker() Use web workers with react hook" />
  <br>
</h1>

<h2 align="center">
  ⚛️ useWorker - Use web workers with react hooks
  <BR>
  https://useworker.netlify.com/docs/introduction
</h2>

<h3 align="center">
  <img alt="GitHub" src="https://img.shields.io/npm/dm/@koale/useworker" />
  <img alt="size" src="https://img.shields.io/bundlephobia/minzip/@koale/useworker/2.0.6" />
  <img alt="GitHub" src="https://img.shields.io/npm/l/@koale/useworker" />
</h3>

---

## Features

- Run expensive function **without blocking UI** ([Show live gif](https://github.com/alewin/useWorker/issues/2))
- Supports **Promises** pattern instead of event-messages
- Size: `< 1KB`, with `zero` dependencies
- Clear **API** using hook

---

## [Install](https://www.npmjs.com/package/@koale/useworker)

```bash
npm i @koale/useworker
```

---

## Import

```jsx
import { useWorker, WORKER_STATUS } from "@koale/useworker";
```

---

## Docs

> https://useworker.netlify.com/docs/introduction

---

## Demo

> https://icji4.csb.app/

---

## Web Workers

Before you start using this [hook](https://www.npmjs.com/package/@koale/useworker), I suggest you to read the [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) documentation.

---

## Usage

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

## Examples

[![Edit white-glitter-icji4](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/white-glitter-icji4?fontsize=14&hidenavigation=1&theme=dark)

More examples: https://github.com/alewin/useWorker/tree/develop/example

---

## Roadmap

- [x] Kill Web Worker
- [x] Reactive web worker status
- [x] Add timeout option
- [x] import and use external script inside `useWorker` function
- [ ] import and use local script inside `useWorker` function
- [ ] run multiple instance of the worker

---

## Contribute? Bug? New Feature?

The library is experimental so if you find a **bug** or would like to request a new **feature**, open an [issue](https://github.com/alewin/useWorker/issues/new)

---

## License

MIT © [alewin](https://github.com/alewin)

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/833cd6b2-6e74-47f0-aa85-5f14aea8ea35/deploy-status)](https://app.netlify.com/sites/useworker/deploys)
