export const getAverage = (arr: Array<string>) => {
  const sum = arr.reduce(
    (temperature, val) => temperature + parseFloat(val),
    0
  );
  return parseFloat((sum / arr.length).toFixed(2));
};
