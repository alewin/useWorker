/* eslint-disable no-param-reassign */
const generateCsv = () => {
  const headers =
    "header1,header2,header3,header4,header5,header6,header7,header8";
  const numbers = [...Array(50000)].map(() =>
    Math.floor(Math.random() * 1000000)
  );

  const result = numbers.reduce((acc, val) => {
    const row = [];
    for (let index = 0; index < headers.split(",").length; index += 1) {
      const random = Math.random()
        .toString(36)
        .substring(7);
      row.push(random);
    }
    acc += `\n${row.join(",")}`;
    return acc;
  }, headers);
  return result;
};

export default generateCsv;
