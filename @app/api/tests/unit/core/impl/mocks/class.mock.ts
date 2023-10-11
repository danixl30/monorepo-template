import { TypeClass } from '@mono/types-utils'
import { objectKeys } from '@mono/object-utils'

type PickMatching<T, V> = { [K in keyof T as T[K] extends V ? K : never]: T[K] }

// eslint-disable-next-line @typescript-eslint/ban-types
type ExtractMethods<T> = PickMatching<T, Function>

export class ClassMock<C, T extends TypeClass<C>, Methods = ExtractMethods<T>> {
    constructor(private target: T) {}

    addMethodDef<Method extends keyof Methods>(
        name: Method,
        func: Methods[Method],
    ) {
        this.target.prototype[name] = func
    }

    setEmptyMethods() {
        const methods = objectKeys(this.target.prototype)
        methods.forEach(
            (method) =>
                (this.target[method] = function () {
                    throw new Error(
                        'This a mock class, this method not have a concrete implementation',
                    )
                }),
        )
    }

    build() {
        return new this.target()
    }
}
