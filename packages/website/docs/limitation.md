---
id: limitations
title: Limitations
---

## Web Worker

Before you start using this hook, I suggest you read the [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) documentation.

> Remember that your web worker function `fn` must be a function **without** local dependencies, which **does not** produce side-effects.

:::warning

- The web worker **don't** have access to the document, and window object

```javascript
  document.querySelectoAll('#demoId'); // not allowed!!
  window.navigator // not allowed!!
```

:::

---

:::warning

- While the worker is running you **cannot** call him again, until it's finished, or until you kill it. To get around this you can create two or more "instances" of the hook

```javascript
  const [sort1] = useWorker(sort, { timeout: 10000 });
  const [sort2] = useWorker(sort, { autoTerminate: false });
  const [sort3] = useWorker(sort);
```

:::

---

:::warning

- The web worker **cannot** returns a function because the response is serialized.

```javascript
  const fn = () => {
    return () => 1 + 2 // not allowed!!
  }

  const fn = () => {
    const sum = 1 + 2
    return sum; // allowed!!
  }
```

:::

---

:::warning
Web Workers are limited by the available CPU and memory

**Is there a way to determine the number of available CPU cores in JavaScript?**
Yes using [navigator.hardwareConcurrency](https://html.spec.whatwg.org/multipage/workers.html#navigator.hardwareconcurrency)

```javascript
navigator.hardwareConcurrency
```

:::
