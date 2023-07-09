import React from "react";
import { useWorker } from "../dist/index";
import { renderHook } from "@testing-library/react-hooks";

function wait(ms) {
	var start = new Date().getTime();
	var end = start;
	while (end < start + ms) {
		end = new Date().getTime();
	}
	return 100;
}

it("Runs successfully", async () => {
	const sum = (a, b) => a + b;
	const { result } = renderHook(() => useWorker(sum));
	const [sumWorker] = result.current;
	const res = await sumWorker(1, 2);
	assert.equal(res, 3);
});

it("Kills successfully", async () => {
	const { result } = renderHook(() => useWorker(wait));
	const [waitWorker, { kill, status }] = result.current;
	waitWorker(1500).then(v => {
		assert.equal(v, 100);
		console.log("waitWorker Completed", v);
	}).catch(e => {
		console.log("waitWorker Error");
		console.error(e);
	}).finally(() => {
		console.log("waitWorker Finally");
	});
	waitWorker(500);
	kill();
	let res = await waitWorker(1000);
	assert.equal(res, 100);
});