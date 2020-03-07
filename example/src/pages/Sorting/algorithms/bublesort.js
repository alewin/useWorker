const bubleSort = input => {
  let swap;
  let n = input.length - 1;
  const sortedArray = input.slice();
  do {
    swap = false;
    for (let index = 0; index < n; index += 1) {
      if (sortedArray[index] > sortedArray[index + 1]) {
        const tmp = sortedArray[index];
        sortedArray[index] = sortedArray[index + 1];
        sortedArray[index + 1] = tmp;
        swap = true;
      }
    }
    n -= 1;
  } while (swap);

  return sortedArray;
};

export default bubleSort;
