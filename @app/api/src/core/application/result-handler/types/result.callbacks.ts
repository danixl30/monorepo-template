import { ApplicationError } from '../../error/application.error'

export type ResultHandler<T, E extends ApplicationError, R, RE> = {
    success(value: T): R
    error(error: E): RE
}
