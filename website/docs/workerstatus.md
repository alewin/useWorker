---
id: api-workerstatus
title: WORKER_STATUS
---

## Import

```jsx
import { WORKER_STATUS } from "@koale/useworker";
```

## API

| WORKER_STATUS     | Type   | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| `PENDING`         | string | the web worker has been initialized, but has not yet been executed |
| `SUCCESS`         | string | the web worker, has been executed correctly                        |
| `RUNNING`         | string | the web worker, is running                                         |
| `ERROR`           | string | the web worker, ended with an error                                |
| `TIMEOUT_EXPIRED` | string | The web worker was killed because the defined timeout expired.     |
