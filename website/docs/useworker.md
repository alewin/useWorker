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
const [workerFn, controller] = useWorker(fn, options);
```

## Hook API

| Value           | Type             | Description                                                |
| --------------- | ---------------- | ---------------------------------------------------------- |
| fn              | Function         | The `pure function` to run with web workers                |
| workerFn        | Promise          | The `function` that allows you to run `fn` with web worker |
| controller      | Object           | Hook controller ( see Controller API)                      |
| options         | Object           | The object containing the options of the worker            |

:::note
to view the values of `WORKER_STATUS` click here: [Status API](./workerstatus.md)
:::

## Controller API

| Value           | Type             | Description                                                |
| --------------- | ---------------- | ---------------------------------------------------------- |
| status          | `@WORKER_STATUS` | The status of `workerFn`                                   |
| kill            | Function         | The function that allows killing the worker                 |

### Options

## Options API

| Value              | Type            | Default   | Description                                                               |
| ------------------ | --------------- | --------- | ------------------------------------------------------------------------- |
| timeout            | Number          | undefined | The number of milliseconds before killing the worker                      |
| remoteDependencies | Array of String | []        | An array that contains the remote dependencies needed to run the worker   |
| autoTerminate      | Boolean         | true      | Kill the worker once it's done (success or error)                         |
| transferable       | String          | 'auto'    | Enable [Transferable Objects](https://developer.mozilla.org/en-US/docs/Web/API/Transferable), to disable it set transferable: 'none' |

## Options Example

```javascript
import { useWorker } from "@koale/useworker";

const fn = dates => dates.sort(dateFns.compareAsc)

const [workerFn, {status: workerStatus, kill: workerTerminate }] = useWorker(fn, {
  timeout: 50000 // 5 seconds
  remoteDependencies: [
    "https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.js" // dateFns
  ],
});
```

:::tip
To see an example click here: [ExternalScripts](https://github.com/alewin/useWorker/blob/develop/example/src/pages/ExternalScripts/index.js)
:::
