# Date constructor methods

## isDate

Checks if something is a instace of Date

```typescript
Date.isDate(new Date()) // true
```

# Date prototype methods

## equals

Check's if two date instaces are equals

```typescript
const date1 = new Date()
const date2 = new Date()
date1.equals(date2) // true
//if you like operator overloading
date1 == date2
```

## lessThan

Check's if date time is less than another date instance.

```typescript
const date1 = new Date('2022-01-01')
const date2 = new Date('2023-01-01')
date1.lessThan(date2) // true
//if you like operator overloading
date1 < date2
```

## lessEqualsThan

Check's if date time is less or equals than another date instance.

```typescript
const date1 = new Date('2022-01-01')
const date2 = new Date('2023-01-01')
date1.lessEqualsThan(date2) // true
//if you like operator overloading
date1 <= date2
```