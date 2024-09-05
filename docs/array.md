# Array prototype

In this section you can find all of new array methods that you can use

## isEmpty

Returns a true if array is empty. Example:

```typescript
[].isEmpty() // true
[1, 2, 3].isEmpty() // false
```

## isNotEmpty

Returns a true if array is empty. Example:

```typescript
[1, 2, 3].isNotEmpty() // true
[].isEmpty() // false
```

## lastIndex

Returns the last index of array

```typescript
[1 , 2, 3].lastIndex // 2
```

## last

Returns the last element of array

```typescript
[1 , 2, 3].last // 3
```

## indexes

Returns an array with the indexes of the oricinal array. Example:

```typescript
const arr = ['e1', 'e2', 'e3']
arr.indexes() // [0, 1, 2]
```

## count

Count array elements by callback. Expample:

```typescript
const numbers = [1, 2, 3, 4]
numbers.count(e => e % 3 === 0) // 1
```

## findMap

Is a mix with find and map. If the callback returns undefined this will continue to try until the callback not be undefined and returns the value. Example:

```typescript
const numbers = [1, 2, 3, 4]
numbers.findMap(e => e % 3 === 0 ? e * 2 : undefined) // 6
```

## filterWithComplement

It's like original filter, but you get the elements that not filtered. Exmaple:

```typescript
const numbers = [1, 2, 3, 4]
numbers.filterWithComplement(e => e % 2 === 0) // [[2, 4], [1, 3]]
```

## asyncMap

Is like original map but you can manage async callbacks. Return a promise with the new array. Example:

```typescript
const productIds = [1, 2, 3]
const products = await productIds.asyncMap(async (id) => {
    const product = await getProductById(id)
    return product
})
```

## asyncFilter

Is like original filter but you can manage async callbacks. Return a promise with the new array. Example:

```typescript
const products = [{
    id: 1,
    desc: 'product 1'
}, {
    id: 2,
    desc: 'product 2'
}]
const productsFiltered = await products
    .asyncFilter(
        async (product) => isProductValid(product.id)
        )
```

## asyncForEach

Is like original foreach but you can manage async callbacks. Return a promise with the new array. Example:

```typescript
const products = [{
    id: 1,
    desc: 'product 1'
}, {
    id: 2,
    desc: 'product 2'
}]
await products
    .asyncForEach(
        async (product) => saveProduct(product)
        )
```

## asyncReduce

Is like original reduce but you can manage async callbacks. Return a promise with the new array. 

## asyncReduceRight

Is like original reduceRigh but you can manage async callbacks. Return a promise with the new array. 

## asyncFind

Is like original find but you can manage async callbacks. Return a promise with the new array. Example 

```typescript
const products = [{
    id: 1,
    desc: 'product 1'
}, {
    id: 2,
    desc: 'product 2'
}]
const productFinded = await products
    .asyncFind(
        async (product) => isProductValid(product.id)
        )
```

## asyncFindIndex

Is like original findIndex but you can manage async callbacks. Return a promise with the new array. Example 

```typescript
const products = [{
    id: 1,
    desc: 'product 1'
}, {
    id: 2,
    desc: 'product 2'
}]
const productIndexFinded = await products
    .asyncFindIndex(
        async (product) => isProductValid(product.id)
        )
```

## asyncSome

Is like original some but you can manage async callbacks. Return a promise with the new array. Example 

```typescript
const products = [{
    id: 1,
    desc: 'product 1'
}, {
    id: 2,
    desc: 'product 2'
}]
const isProductValid = await products
    .asyncSome(
        async (product) => isProductValid(product.id)
        )
```

## asyncEvery

Is like original every but you can manage async callbacks. Return a promise with the new array. Example 

```typescript
const products = [{
    id: 1,
    desc: 'product 1'
}, {
    id: 2,
    desc: 'product 2'
}]
const areProductsValid = await products
    .asyncEvery(
        async (product) => isProductValid(product.id)
        )
```

## asyncCount

It's like original count, but you can use async callbacks.

## asyncFindMap

It's like the findMap, but with async callback.

## asyncFilterWithComplement

It's like filterWithComplement, but you can use async callbacks

## equals

Compare if contests of two arays are equals. It's a deep compare in case that array contains objects. Example:

```typescript
const arr1 = [1, 2, 3]
const arr2 = [1, 2, 3]
arr1.equals(arr2) // true
// if you like to use operator overloading
arr1 == arr2 // true
```

## asSecuence

Create a secuence abject by original array. It's like Kotlin's [asSecuesce](https://kotlinlang.org/docs/sequences.html#sequence-processing-example) or Streams in Java. It's a vertical execution of filter and map callbacks. Example:

```typescript
const arr = [1, 2, 3, 4]
arr.asSecuence()
    .filter(e => e % 2 === 0)
    .map(e => e * 3)
    .takeFirst() // 6
```

You have take(number) where you can specify the max number of elements that the secuence take. Also you have takeFirst and takeLast.

## asSecuenceAsync

It's like the asSecuence but you can use async callbacks.