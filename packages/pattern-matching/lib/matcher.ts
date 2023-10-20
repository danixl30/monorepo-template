import { isEqual } from './comparator'

type SubType<T> = T extends object
    ? T extends Array<infer U>
        ? Partial<U>[]
        : Partial<T>
    : T

type Callback<T, R> = (input: T) => R

class Matcher<T, R = any> {
    constructor(private input: T, private callbackMatched?: Callback<T, R>) {}
    with(targets: SubType<T> | SubType<T>[], callback: Callback<T, R>) {
        if (this.callbackMatched) return this
        if (!Array.isArray(targets)) {
            const matched = isEqual(this.input, targets)
            if (matched) this.callbackMatched = callback
            return this
        }
        const matched = targets.some((e) => isEqual(this.input, e))
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
