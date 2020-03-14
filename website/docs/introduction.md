---
id: introduction
title: Introduction
sidebar_label: Introduction
---

## useWorker

`useWorker()` is a library that allows you to use the WEB API: [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), through the React Hooks.
This library allows you to run the expensive function without blocking the user interface, using a simple interface that makes use of [Promise](https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Web Api

The javascript language is **single threaded**, so if we're executing an expensive code, we should wait for it, before continuing to execute other portions of code.
Some javascript features are offered by the browser, through the **Web API** (XMLHttpRequest, EventListener, Worker...).
In this way, many features can be run in "**parallel**" without blocking our javascript code

## Features

- Run expensive function without blocking UI (Show live gif)
- Supports Promises pattern instead of event-messages
- Size: < 1KB, with zero dependencies
- Clear API using hook
- Garbage collector web worker instance
- set a timeout for the web worker

the most useful feature of `useWorker`,  however, is the *simplicity*, in this paragraph, you can see the difference between using web workers via pure javascript and via `useWorker()`.

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
const sortNumbers numbers => ([...numbers].sort())
const [sortWorker] = useWorker(sortNumbers);

const result = await sortWorker([1,2,3])
```

---
