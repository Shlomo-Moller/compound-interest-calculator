import { compoundInterest } from "./src/calc";
import { DEFAULTS } from "./src/utils/defaults";

// Check if the script is run directly from the command line
if (require.main === module) {
  const [
    ,
    ,
    yearsCount = DEFAULTS.yearsCount,
    annualReturnPercentage = DEFAULTS.annualReturnPercentage,
    depositAmount = DEFAULTS.deposit.amount,
    depositRate = DEFAULTS.deposit.frequency,
  ] = process.argv;
  compoundInterest(
    Number(yearsCount),
    Number(annualReturnPercentage),
    Number(depositAmount),
    Number(depositRate)
  );
}

export { compoundInterest };
