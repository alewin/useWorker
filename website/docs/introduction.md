---
id: introduction
title: Introduction
sidebar_label: Introduction
---

## useWorker

`useWorker()` is a js library (_with typescript support_) that allows you to use the [Web Worker Web API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), through React Hooks.
This library allows you to run the expensive function without blocking the user interface, using a simple syntax that makes use of [Promise](https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Web API

The javascript language is **single-threaded**, so if we're executing an expensive task, we should wait for it, before continuing to execute other portions of code.
Some javascript features are offered by the browser, through the **Web API** (XMLHttpRequest, EventListener, Worker...).
In this way, many features can be run in "**parallel**" without blocking our javascript code

## Features

- Run expensive function **without blocking UI** ([Show live gif](https://github.com/alewin/useWorker/issues/2))
- Supports **Promises** pattern instead of event-messages
- Size: less than `3KB`
- Clear [API](https://useworker.js.org/docs/api-useworker#options-api) using hook
- Typescript support
- Garbage collector web worker instance
- [Remote dependencies](https://useworker.js.org/docs/api-useworker#options-api) option
- [Timeout](https://useworker.js.org/docs/api-useworker#options-api) option
- Support [Transferable](https://useworker.js.org/docs/api-useworker#options-api)

the most useful feature of `useWorker`, however, is the *simplicity*. You can see the difference between using web workers via pure javascript and via `useWorker()`.

### Without using useWorker

`webworker.js`

```javascript

self.addEventListener("message", function(event) {
  var numbers = [...event.data]
  postMessage(numbers.sort())
});
```

`index.js`

```javascript
var webworker = new Worker("./webworker.js");

webworker.postMessage([3,2,1]);

webworker.addEventListener("message", function(event) {
    console.log("Message from worker:", event.data); // [1,2,3]
});
```

### Using useWorker

`index.js`

```javascript
const sortNumbers = numbers => ([...numbers].sort())
const [sortWorker] = useWorker(sortNumbers);

const result = await sortWorker([1,2,3])
```

---
