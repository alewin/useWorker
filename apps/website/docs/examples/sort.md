---
id: examples-sort
title: Sorting Numbers
---

## Example

<iframe
  width="100%"
  height="500px"
  src="https://codesandbox.io/embed/white-glitter-icji4?fontsize=14&hidenavigation=1&theme=dark">
</iframe>

---

[![Edit white-glitter-icji4](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/white-glitter-icji4?fontsize=14&hidenavigation=1&theme=dark)

---

```javascript
import bubleSort from "./algorithms/bublesort";

const numbers = [...Array(50000)].map(() =>
  Math.floor(Math.random() * 1000000)
);

function App() {
  const [sortWorker, { status: sortWorkerStatus, kill: killWorker }] = useWorker(bubleSort);

  const onWorkerSortClick = () => {
    sortWorker(numbers).then(result => {
      console.log("Buble Sort useWorker()", result);
      addToast("Finished: Sort using useWorker.", { appearance: "success" });
    });
  };
}
```

See Full code [Github](https://github.com/alewin/useWorker/tree/develop/example/src/pages/Sorting)
