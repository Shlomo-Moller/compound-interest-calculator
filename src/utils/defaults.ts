import { DepositFrequency } from "./enums";

const DEFAULTS = {
  yearsCount: 40,
  annualReturnPercentage: 8,
  deposit: {
    amount: 1000,
    frequency: DepositFrequency.Monthly,
  },
};

export { DEFAULTS };
