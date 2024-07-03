import { getNewDataMap, getRequiredPaddingLength } from "./dataMap";
import { addAnnualReturn, padRight } from "./functions";
import { roundFormat } from "./currencyFormat";
import { DepositFrequency } from "./enums";

const getCompoundInterest = (
  yearsCount: number,
  annualReturnPercentage: number,
  depositAmount: number,
  depositRate: DepositFrequency
) => {
  let yearIndex = 1;

  const oneTimeDeposit = () => depositRate === DepositFrequency.OneTime;
  const monthlyDeposit = () => depositRate === DepositFrequency.Monthly;
  const firstYear = () => yearIndex === 1;

  const map = getNewDataMap();

  for (; yearIndex <= yearsCount; ++yearIndex) {
    const lastYearIndex = yearIndex - 1;
    const currentYearDeposit = oneTimeDeposit()
      ? firstYear()
        ? depositAmount
        : 0
      : monthlyDeposit()
      ? depositAmount * 12
      : depositAmount;
    const lastYearInfo = map.get(lastYearIndex);

    if (lastYearInfo === undefined) {
      console.log("Error", "lastYearInfo is undefined");
      return;
    }

    const lastYearDeposit = lastYearInfo.totalDeposit;
    const totalDeposit =
      lastYearDeposit +
      (oneTimeDeposit()
        ? firstYear()
          ? depositAmount
          : 0
        : currentYearDeposit);
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
  >,
  depositRate: DepositFrequency
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

  translatedData.shift();

  const firstYearInfo = dataMap.get(1);

  if (firstYearInfo === undefined) {
    console.log("Error", "firstYearInfo is undefined");
    return;
  }

  const annualReturnPercentage = Math.round(
    (100 * firstYearInfo.totalProfit) / firstYearInfo.totalDeposit
  );

  const oneTimeDeposit = () => depositRate === DepositFrequency.OneTime;
  const yearlyDeposit = () => depositRate === DepositFrequency.Yearly;

  console.log("Total Years of Investment:", dataMap.size - 1);
  console.log("Annual Return Percentage:", annualReturnPercentage);

  if (oneTimeDeposit()) {
    console.log("One Time Deposit:", firstYearInfo.totalDeposit);
  } else if (yearlyDeposit()) {
    console.log("Yearly Deposit:", firstYearInfo.totalDeposit);
  } else {
    console.log("Monthly Deposit:", firstYearInfo.totalDeposit / 12);
  }

  console.log(
    `All table values are cumulative -
    - ‘Invested’/‘Have’/‘Profit’ in total. Not per year/row.
    - ‘Monthly profit’ is calculated by dividing the total profit accumulated up to the specified year by the number of months from the start until that year.`
  );

  console.table(translatedData);
};

export { getCompoundInterest, printCompoundInterest };
