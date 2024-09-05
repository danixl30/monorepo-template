# Promise constructor

## isPromise

Check's if something is a promise.

```typescript
Promise.isPromise(Promise.resolve(4)) // true
```

## parallel

Resolve a group of promises parallely, you can set an array of promises or dictionary.

```typescript
await Promise.parallel([Promise.resolve(1), Promise.resolve(2)]) // [1, 2]
await Promise.parallel({
    item1: Promise.resolve(1),
    item2: Promise.resolve(2),
}) // { item1: 1, item2: 2 }
```

## sequence

Resolve a group of promises secuentialy, you can set an array of promises or dictionary.

```typescript
await Promise.sequence([Promise.resolve(1), Promise.resolve(2)]) // [1, 2]
await Promise.sequence({
    item1: Promise.resolve(1),
    item2: Promise.resolve(2),
}) // { item1: 1, item2: 2 }
```

## try

Wrap a function in to Promise, can be async or syncronous

# Promise prototype

## map

**Only for promise that wraps array** If promise wraps an array you can use map directly.

## filter

**Only for promise that wraps array** If promise wraps an array you can use filter directly.

## each

**Only for promise that wraps array** If promise wraps an array you can use forEach directly.

## some

**Only for promise that wraps array** If promise wraps an array you can use some directly.

## every

**Only for promise that wraps array** If promise wraps an array you can use every directly.

## find

**Only for promise that wraps array** If promise wraps an array you can use find directly.

## count

**Only for promise that wraps array** If promise wraps an array you can use count directly.

## reduce

**Only for promise that wraps array** If promise wraps an array you can use reduce directly.

## findMap

**Only for promise that wraps array** If promise wraps an array you can use findMap directly.

## filterWithComplement

**Only for promise that wraps array** If promise wraps an array you can use filterWithComplement directly.