import { roundFormat } from "./currencyFormat";

const getNewDataMap = () => {
  const map = new Map<
    number,
    {
      totalDeposit: number;
      totalMoney: number;
      totalProfit: number;
      monthlyProfit: number;
    }
  >();

  map.set(0, {
    totalDeposit: 0,
    totalMoney: 0,
    totalProfit: 0,
    monthlyProfit: 0,
  });

  return map;
};

/**
 * Returns the length of the string resulting from formatting the highest value in `dataMap` as currency.
 */
const getRequiredPaddingLength = (
  dataMap: Map<
    number,
    {
      totalDeposit: number;
      totalMoney: number;
      totalProfit: number;
      monthlyProfit: number;
    }
  >
): number => {
  const lastKey = dataMap.size - 1;

  const largestNumber = dataMap.get(lastKey)?.totalMoney;

  if (largestNumber === undefined) {
    console.log("Error", "largestNumber === undefined");
    return 15;
  }

  return roundFormat(largestNumber).length;
};

export { getNewDataMap, getRequiredPaddingLength };
