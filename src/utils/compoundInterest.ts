import { DEFAULTS } from "./defaults";
import { getNewDataMap, getRequiredPaddingLength } from "./dataMap";
import { addAnnualReturn, padRight } from "./functions";
import { roundFormat } from "./currencyFormat";

const getCompoundInterest = (
  yearsCount = DEFAULTS.yearsCount,
  monthlyDeposit = DEFAULTS.monthlyDeposit,
  annualReturnPercentage = DEFAULTS.annualReturnPercentage
) => {
  const map = getNewDataMap();

  for (let yearIndex = 1; yearIndex <= yearsCount; ++yearIndex) {
    const lastYearIndex = yearIndex - 1;
    const currentYearDeposit = 12 * monthlyDeposit;
    const lastYearInfo = map.get(lastYearIndex);

    if (lastYearInfo === undefined) {
      console.log("Error", "lastYearInfo is undefined");
      return;
    }

    const lastYearDeposit = lastYearInfo.totalDeposit;
    const totalDeposit = lastYearDeposit + currentYearDeposit;
    const totalMoney = addAnnualReturn(
      lastYearInfo.totalMoney + currentYearDeposit,
      annualReturnPercentage
    );
    const totalProfit = totalMoney - totalDeposit;
    const monthlyProfit = totalProfit / yearIndex / 12;

    map.set(yearIndex, {
      totalDeposit,
      totalMoney,
      totalProfit,
      monthlyProfit,
    });
  }

  return map;
};

const printCompoundInterest = (
  dataMap: Map<
    number,
    {
      totalDeposit: number;
      totalMoney: number;
      totalProfit: number;
      monthlyProfit: number;
    }
  >
) => {
  const alignWithSpaces = (str: string): string =>
    padRight(str, getRequiredPaddingLength(dataMap));

  const roundAlignFormat = (value: number): string =>
    alignWithSpaces(roundFormat(value));

  const translatedData = Array.from(dataMap.entries()).map(
    ([, value], index) => ({
      Year: index,
      Invested: roundAlignFormat(value.totalDeposit),
      Have: roundAlignFormat(value.totalMoney),
      Profit: roundAlignFormat(value.totalProfit),
      "Monthly profit": roundAlignFormat(value.monthlyProfit),
    })
  );

  const firstYearInfo = dataMap.get(1);

  if (firstYearInfo === undefined) {
    console.log("Error", "firstYearInfo is undefined");
    return;
  }

  const annualReturnPercentage =
    (100 * firstYearInfo.totalProfit) / firstYearInfo.totalDeposit;

  console.log("Total Years of Investment:", dataMap.size - 1);
  console.log("Monthly Deposit:", firstYearInfo.totalDeposit / 12);
  console.log("Annual Return Percentage", annualReturnPercentage + "%");

  console.table(translatedData);
};

export { getCompoundInterest, printCompoundInterest };
