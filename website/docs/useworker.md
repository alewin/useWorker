---
id: api-useworker
title: useWorker()
---

## Import

```javascript
import { useWorker } from "@koale/useworker";
```

## Usage

```javascript
const [workerFn, workerStatus, workerTerminate] = useWorker(fn, options);
```

## API

| Value           | Type             | Description                                                |
| --------------- | ---------------- | ---------------------------------------------------------- |
| fn              | Function         | The `pure function` to run with web workers                |
| workerFn        | Promise          | The `function` that allows you to run `fn` with web worker |
| workerStatus    | `@WORKER_STATUS` | The status of `workerFn`                                   |
| workerTerminate | Function         | The function that allow to kill the worker                 |
| options         | Object           | The object containing the options of the worker            |

:::note
to view the values of `WORKER_STATUS` click here: [Status API](./workerstatus.md)
:::

### Options

```javascript
import { useWorker } from "@koale/useworker";
const [workerFn, workerStatus, workerTerminate] = useWorker(fn, {
  timeout: undefined,
  dependencies: []
});
```

## Options API

| Value        | Type            | Default   | Description                                                               |
| ------------ | --------------- | --------- | ------------------------------------------------------------------------- |
| timeout      | Number          | undefined | the number of milliseconds before killing the worker                      |
| dependencies | Array of String | []        | an array that contains the external dependencies needed to run the worker |

## Options Example

```javascript
import { useWorker } from "@koale/useworker";

const fn = dates => dates.sort(dateFns.compareAsc)

const [workerFn, workerStatus, workerTerminate] = useWorker(fn, {
  timeout: 50000 // 5 seconds
  dependencies: [
      "https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.js" // dateFns
    ]
});
```

:::tip
To see an example click here: [ExternalScripts](https://github.com/alewin/useWorker/blob/develop/example/src/pages/ExternalScripts/index.js)
:::
