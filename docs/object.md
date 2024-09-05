# Object prototype methods

## asRecord

It returns a copy of the object with only state and this is inmutable, you can compare, convert into string like JSON

```typescript
const object1 = {
    a: 1,
    b: {
        c: 2
    }
}
const object2 = {
    a: 1,
    b: {
        c: 2
    }
}
object1.asRecord().equals(object2.asRecord()) // true
//if you like operator overloading
object1.asRecord() == object2.asRecord()
```