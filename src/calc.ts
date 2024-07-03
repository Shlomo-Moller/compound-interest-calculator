import {
  getCompoundInterest,
  printCompoundInterest,
} from "./utils/compoundInterest";
import { DEFAULTS } from "./utils/defaults";

const compoundInterest = (
  yearsCount = DEFAULTS.yearsCount,
  annualReturnPercentage = DEFAULTS.annualReturnPercentage,
  depositAmount = DEFAULTS.deposit.amount,
  depositRate = DEFAULTS.deposit.frequency
) => {
  const map = getCompoundInterest(
    yearsCount,
    annualReturnPercentage,
    depositAmount,
    depositRate
  );

  if (map === undefined) {
    console.log("Error", "map is undefined");
    return;
  }

  printCompoundInterest(map, depositRate);
};

export { compoundInterest };
