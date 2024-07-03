import {
  getCompoundInterest,
  printCompoundInterest,
} from "./utils/compoundInterest";
import { DEFAULTS } from "./utils/defaults";

const compoundInterest = (
  yearsCount = DEFAULTS.yearsCount,
  monthlyDeposit = DEFAULTS.monthlyDeposit,
  annualReturnPercentage = DEFAULTS.annualReturnPercentage
) => {
  const map = getCompoundInterest(
    yearsCount,
    monthlyDeposit,
    annualReturnPercentage
  );

  if (map === undefined) {
    console.log("Error", "map is undefined");
    return;
  }

  printCompoundInterest(map);
};

export { compoundInterest };
