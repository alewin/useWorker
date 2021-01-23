---
id: examples-external
title: External Scripts
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
  const sortDates = dates => {
    // eslint-disable-next-line no-undef
    return dates.sort(dateFns.compareAsc);
  };

  const [sortWorker, { status: sortWorkerStatus, kill: killWorker }] = useWorker(sortDates, {
    timeout: 5000,
    remoteDependencies: [
      "https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.js"
    ]
  });

  const onWorkerSortClick = () => {
    sortWorker(dates).then(result => {
      console.log("Buble Sort useWorker()", result);
      addToast("Finished: Sort using useWorker.", { appearance: "success" });
    });
  };

```

See Full code [Github](https://github.com/alewin/useWorker/tree/develop/example/src/pages/ExternalScripts)
