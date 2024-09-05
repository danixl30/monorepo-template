# Compiler

In this seccion you can find the new functionalities about the custom compiler.

## Import paths

This compiler was desing for be used with native ESM modules, but the current typescript version has some limitations when have to parse the imports, for this reason you can use many forms of import modules without to change target, module or module resolution option. For example:

```typescript
// src/second.ts
export const name = 'second'
```

```typescript
// src/main.ts
import { name } from './second'
import { name } from './second.ts'
import { name } from './second.js'
```

All of this forms are valid with this compiler, you not need to change it. Also, con resolve the dicectory imports. Example:

```typescript
// src/module/index.ts
export const name = 'module'
```
```typescript
// src/main.ts
import { name } from './module'
```
The compiler can parse absolute paths configurated in tsconfig.json file directly.

## Operator everloading

Th ecompiler has the capacity to override comparation operators like ```==```, ```!==```, ```<```, ```>```, ```<=```, ```>=```. All of this operators con be overrided by defining some methods in types.

For everride ``==`` and `!=`, you must to define equals method that recieves one parameter and returns boolean. For example:

```typescript
type TestObject = {
    a: number
    equals(other: TestObject): boolean 
}
const object1: TestObject = {
    a: 1,
    equals(other: TestObject) {
        return other.a === this.a
    }
}
const object2: TestObject = {
    a: 1,
    equals(other: TestObject) {
        return other.a === this.a
    }
}
object1 == object2 // true
// is the same of
object1.equals(object2)

// for !=
object1 != object2
// the some of
!object1.equals(object2)
```

For everride `<` and `>`, you must to define lessThan method that recieves one parameter and returns boolean. For example:

```typescript
type TestObject = {
    a: number
    lessThan(other: TestObject): boolean 
}
const object1: TestObject = {
    a: 1,
    lessThan(other: TestObject) {
        return other.a < this.a
    }
}
const object2: TestObject = {
    a: 2,
    lessThan(other: TestObject) {
        return other.a < this.a
    }
}
object1 < object2 // true
// is the same of
object1.lessThan(object2)

// for >
object1 > object2
// the some of
object2.lessThan(object1)
```

For everride `<=` and `>=`, you must to define lessEqualsThan method that recieves one parameter and returns boolean. For example:

```typescript
type TestObject = {
    a: number
    lessEqualsThan(other: TestObject): boolean 
}
const object1: TestObject = {
    a: 1,
    lessEqualsThan(other: TestObject) {
        return other.a <= this.a
    }
}
const object2: TestObject = {
    a: 2,
    lessEqualsThan(other: TestObject) {
        return other.a <= this.a
    }
}
object1 <= object2 // true
// is the same of
object1.lessEqualsThan(object2)

// for >
object1 >= object2
// the some of
object2.lessEqualsThan(object1)
```

## __dirname, __filename and require exist

When you use NodeJs with ESM modules you can't access to `__dirname`, `__filename` and `require`, or you must to create it manually. The compiler can put it for you in all project files and use in code.

## import extensions

If you have a barrel and file you can extend this file by another files, and the compiler can "join" it at index. For example:

```typescript
// src/module/core.ts
export type DictionaryOfMethods = {
    [key: string]: () => void
}
export const dictionary: DictionaryOfMethods = {}
```

```typescript
// src/module/index.ts
export * from './core'
```

If you want to include methods in dictionary you can use this pattern: *.{TARGET_FILE_NAME}.extension.ts to create an extension that will be added into the index. For example:

```typescript
// src/module/hello.core.extension.ts
import { dictionary } from './core'

dictionary['hello'] = () => {
    console.log('hello')
}
```

If you set the corect name in compile time, the file should be added at index and can be used in another part of the code. Following this example:

```typescript
// src/main.ts
import { dictionary } from './module'

dictionary.['hello'].() // should prints 'hello'
```

You can use this feature to pollyfill object prototypes.