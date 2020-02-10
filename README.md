# useWorker() Hook

![logo](logo.png)

`useWorker()` - Use web workers with react hooks

![npm](https://img.shields.io/npm/dy/@koale/useworker)
![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/@koale/useworker/0.0.2)
![GitHub issues](https://img.shields.io/github/issues/alewin/useworker)
![NPM](https://img.shields.io/npm/l/@koale/useworker)


## Features

- Run expensive function **without blocking UI**
- Supports **Promises** pattern instead of event-messages
- Clear **API**

## [Install](https://www.npmjs.com/package/@koale/useworker)

```bash
npm i @koale/useworker
```

## Import

```jsx
import useWorker, { status } from "@koale/useworker";
```

## API

```javascript
const [workerFn, workerStatus, workerTerminate] = useWorker(fun);
```

| Value           | Type             | Description                                                 |
| --------------- | ---------------- | ----------------------------------------------------------- |
| fun             | Function         | The `pure function` to run with web workers                 |
| workerFn        | Promise Function | The `function` that allows you to run `fun` with web worker |
| workerStatus    | `@STATUS`        | The status of `workerFn` function                           |
| workerTerminate | Function         | The function that allow to kill the worker                  |

## CONSTS

**@STATUS:**
| Value            | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `STATUS_PENDING` | the web worker has been initialized, but has not yet been runned |
| `STATUS_SUCCESS` | the web worker, has been executed correctly                      |
| `STATUS_RUNNING` | the web worker, is running                                       |
| `STATUS_ERROR`   | tthe web worker, ended with an error                             |

## Usage

```jsx
import React from "react";
import useWorker from "@koale/useworker";

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

## Example

[![Edit use-worker-hook](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/exciting-jackson-b5ljt?fontsize=14&hidenavigation=1&theme=dark)

## License

MIT © [alewin](https://github.com/alewin)
