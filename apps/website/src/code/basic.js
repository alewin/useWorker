export default `
import React from "react";
import { useWorker, WORKER_STATUS } from "@koale/useworker";

const numbers = [...Array(5000000)].map(e => ~~(Math.random() * 1000000));
const sortNumbers = nums => nums.sort();

const Example = () => {
  const [sortWorker, { status, kill }] = useWorker(sortNumbers);
  const runSort = async () => {
    const result = await sortWorker(numbers); // non-blocking UI
    console.log("End.");
  };
  return (<button type="button" onClick={runSort}> Run Sort</button>);
};
`.trim()
