import { ApplicationError } from '../../error/application.error'
import { Result } from '../result.handler'

export const extractErrorFromCollection = <T, E extends ApplicationError>(
    arr: Result<T, E>[],
) => arr.find((re) => re.isError())
