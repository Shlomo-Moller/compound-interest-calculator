# compound-interest-calculator

Calculates the total investment and profit for each year of a
[compound interest](https://en.wikipedia.org/wiki/Compound_interest)
period based on number of investment years, annual percentage return, and deposit amount (fixed) and frequency.

## Usage

Run locally:

```
npm run calc [-- <years> <rate> <deposit-amount> <deposit-frequency>]
```

where the... :

- `-- <years> <rate> <deposit-amount> <deposit-frequency>` part is optional, and where
- `<years>` is to be replaced with the investment period length: the number of years of investment (default is `40` as of today),
- `<rate>` is to be replaced with the annual return percentage (default is `8` as of today),
- `<deposit-amount>` is to be replaced with the amount of money being invested (default is `1000` as of today), and
- `<deposit-frequency>` is to be replaced with frequency in which `<deposit-amount>` is being invested (Options are `0`=`OneTime`, `1`=`Yearly`, and `2`=`Monthly`, and default is `Monthly` as of today).

For example, say we invest 1,000 NIS each month, for 40 years, and that the annual return percentage is 7%. Then:

```
npm run calc -- 40 1000 7 2
```

### Default values

When running without specifying parameters' values:

```
npm run calc
```

those values get their defaults from [`src/utils/defaults.ts`](src/utils/defaults.ts)

## To improve

Should improve the logic of the functions at [`src/utils/compoundInterest.ts`](src/utils/compoundInterest.ts).
