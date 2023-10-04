import { ApplicationError } from '../error/application.error'
import { Result } from '../result-handler/result.handler'

export interface CacheManager {
    get<T>(key: string): Promise<Result<T, ApplicationError>>
    save<T>(key: string, data: T): Promise<Result<boolean, ApplicationError>>
    delete(key: string): Promise<Result<boolean, ApplicationError>>
}
