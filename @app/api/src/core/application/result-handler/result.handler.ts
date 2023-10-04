import { ApplicationError } from '../error/application.error'
import { ResultHandler } from './types/result.callbacks'

export class Result<T, E extends ApplicationError> {
    private constructor(private value?: T, private error?: E) {
        if (value !== undefined && error !== undefined)
            throw new Error('Value and error not to be definined same time')
    }

    unwrap(): T {
        if (this.error) throw this.error
        return this.value!
    }

    isError() {
        return Boolean(this.error)
    }

    handleError<R>(handler: (e: E) => R) {
        return handler(this.error!)
    }

    unwrapOr(defaultValue: T): T {
        if (this.value === undefined) return defaultValue
        return this.value
    }

    match<R, RE>(handler: ResultHandler<T, E, R, RE>) {
        if (!this.error) return handler.success(this.value!)
        return handler.error(this.error)
    }

    static success<T>(value: T) {
        return new Result(value, undefined)
    }

    static error<T, E extends ApplicationError>(error: E) {
        return new Result<T, E>(undefined, error)
    }
}
