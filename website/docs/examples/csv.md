---
id: examples-csv
title: Csv parsing
---

## Example

<iframe
  width="100%"
  height="500px"
  src="https://codesandbox.io/embed/white-glitter-icji4?/csvfontsize=14&hidenavigation=1&theme=dark">
</iframe>

---

[![Edit white-glitter-icji4](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/white-glitter-icji4?fontsize=14&hidenavigation=1&theme=dark)

---

```javascript
import csvToJson from "./parser/csvToJson";
import generateCsv from "./parser/generateCsv";

function App() {
  const [generateWorker] = useWorker(generateCsv);
  const [csvWorker, {status: csvWorkerStatus, kill: killWorker }] = useWorker(csvToJson);

 const onWorkerCsvClick = async () => {
    const fakeCsv = await generateWorker();
    csvWorker(fakeCsv).then(result => {
      console.log("Csv useWorker()", result);
      addToast("Finished: Csv parsed using useWorker()", {
        appearance: "success"
      });
    });
  };
}
```

See Full code [Github](https://github.com/alewin/useWorker/tree/develop/example/src/pages/Csv)
