# compound-interest-calculator

Calculates the total investment and profit for each year of a compound interest period based on number of years, monthly deposit, and percentage return.

## Usage

Run locally:

```
npm run calc [-- <years> <deposit> <rate>]
```

where the `-- <years> <deposit> <rate>` part is optional, and where
`<years>` is to be replaced with the investment period length: the number of years of investment,
`<deposit>` is to be replaced with monthly deposit: the amount of money being invested monthly,
and
`<rate>` is to be replaced with the annual return percentage.

For example, say we invest 1,000 NIS each month, for 40 years, and that the annual return percentage is 7%. Then:

```
npm run calc -- 40 1000 7
```

### Default values

When running without specifying parameters' values:

```
npm run calc
```

those values get their defaults from [defaults.ts](src\utils\defaults.ts)
