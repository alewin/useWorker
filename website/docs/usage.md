---
id: usage
title: Usage
---

## useWorker

the `useWorker` function is a hook and accepts as first parameter the function to execute inside the web worker

```javascript
import { useWorker } from "@koale/useworker";
```

**useWorker()** returns an array containing 3 values:

- `sortWorker`: the function to call the web worker
- `sortStatus`: the status of the web worker, defined as the constants [WORKER_STATUS](./workerstatus.md)
- `killSortWorker`: the function used to terminate the web worker

```javascript
const sortNumbers = numbers => ([...numbers].sort())
const [sortWorker, { status: sortStatus, kill: killSortWorker }] = useWorker(sortNumbers);
```

## Example

In this example, the hook is used to sort 5000000 numbers. all sorting operations using web workers, will not block the UI:

```javascript

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
