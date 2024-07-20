import { Result } from '../result-handler/result.handler'

export type ApplicationService<T, U> = (data: T) => Promise<Result<U>>
