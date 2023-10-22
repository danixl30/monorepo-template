import { isEqual } from './comparator'

export type ComparationUtil<T> = {
    (data: T): boolean
    __kind: string
}

export type SubType<T> = T extends Record<any, any>
    ? {
          [P in keyof T]?: SubType<T[P]> | ComparationUtil<T[P]>
      }
    : T extends Array<infer U>
    ? SubType<U>[] | ComparationUtil<SubType<U>[]>
    : T | ComparationUtil<T>

type Callback<T, R> = (input: T) => R

class Matcher<T, R = any> {
    constructor(private input: T, private callbackMatched?: Callback<T, R>) {}
    with(...args: [...targets: SubType<T>[], callback: Callback<T, R>]) {
        if (this.callbackMatched) return this
        const callback = args.pop() as Callback<T, R>
        if (typeof callback !== 'function')
            throw new Error('Callback not valid')
        const matched = args.some((e) => isEqual(this.input, e))
        if (matched) this.callbackMatched = callback
        return this
    }

    when(
        ...args: [...targets: Callback<T, boolean>[], callback: Callback<T, R>]
    ) {
        if (this.callbackMatched) return this
        const callback = args.pop() as Callback<T, R>
        if (typeof callback !== 'function')
            throw new Error('Callback not valid')
        const matched = args.some((e) => e(this.input))
        if (matched) this.callbackMatched = callback
        return this
    }

    otherwise(callback: Callback<T, R>): R {
        if (!this.callbackMatched) return callback(this.input)
        return this.callbackMatched(this.input)
    }

    exhaustive() {
        if (!this.callbackMatched) throw new Error('Input could not be matched')
        return this.callbackMatched(this.input)
    }
}

export const match = <T, R = any>(input: T) => new Matcher<T, R>(input)
