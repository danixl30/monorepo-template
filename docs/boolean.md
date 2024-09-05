# Boolean prototype

## equals

Compare two boolean or two instances of Boolean object.

```typescript
new Boolean(true).equals(new Boolean(true)) // true
// if you like operator overleading
new Boolean(true) == new Boolean(true)
```

## toPrimitive

Is an alias for valueOf

# Boolean constructor

## fromString

Creote a boolean by string. Example:

```typescript
Boolean.fromString('true') // true
```

## fromArray

Get a boolean by array, if array is empty returns false, if is not empty returns true

## fromObject

Get a boolean by object, if object is empty returns false, if is not empty returns true