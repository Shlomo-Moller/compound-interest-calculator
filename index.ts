import { compoundInterest } from "./src/calc";
import { DEFAULTS } from "./src/utils/defaults";

// Check if the script is run directly from the command line
if (require.main === module) {
  const [
    ,
    ,
    yearsCount = DEFAULTS.yearsCount,
    monthlyDeposit = DEFAULTS.monthlyDeposit,
    annualReturnPercentage = DEFAULTS.annualReturnPercentage,
  ] = process.argv;
  compoundInterest(
    Number(yearsCount),
    Number(monthlyDeposit),
    Number(annualReturnPercentage)
  );
}

export { compoundInterest };
