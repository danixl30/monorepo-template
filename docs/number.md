# Number prototype

## equals

Compare two numbers or number objects instances, but with few particularities...
```typescript
new Number(10).equals(new Number(10)) // true
NaN.equals(NaN) // true
2,equals(2) // true
// if you like operator overloading
const num1 = NaN
const num2 = NaN
num1 == num2 // true
```

## nextInt

Returns the next int of number, it's the same of Math.ceail

## toFixedNumber

It's the toFixedMethod but will convert to number directly.