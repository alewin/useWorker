const csvToJson = csv => {
  const [firstLine, ...lines] = csv.split("\n");
  return lines.map(line =>
    firstLine.split(",").reduce(
      (curr, next, index) => ({
        ...curr,
        [next]: line.split(",")[index]
      }),
      {}
    )
  );
};

export default csvToJson;
