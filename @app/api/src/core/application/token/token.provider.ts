import { ApplicationError } from '../error/application.error'
import { Result } from '../result-handler/result.handler'

export interface TokenProvider<T extends object> {
    sign(value: T): Result<string, ApplicationError>
    verify(value: string): Result<T, ApplicationError>
}
