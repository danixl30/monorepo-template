import { ExtractMethods } from '@mono/types-utils'
import { objectKeys } from '@mono/object-utils'

export class ClassMock<C extends object, Methods = ExtractMethods<C>> {
    constructor(private target: C = <C>{}) {
        this.setEmptyMethods()
    }

    addMethodDef<Method extends keyof Methods>(
        name: Method,
        func: Methods[Method],
    ) {
        Object.assign(this.target, {
            [name]: func,
        })
        return this
    }

    private setEmptyMethods() {
        const methods = objectKeys(this.target)
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
        return this.target
    }
}
