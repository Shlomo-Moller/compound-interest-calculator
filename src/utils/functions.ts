const addAnnualReturn = (num: number, annualReturnPercentage: number) =>
  num * (1 + annualReturnPercentage / 100);

const padRight = (str: string, width: number): string => {
  const len = Math.max(0, width - str.length);
  return " ".repeat(len) + str;
};

export { addAnnualReturn, padRight };
