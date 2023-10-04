import { ApplicationError } from '../../error/application.error'
import { Result } from '../result.handler'

export const isResultsHaveError = <T, E extends ApplicationError>(
    arr: Result<T, E>[],
) => arr.some((re) => re.isError())
