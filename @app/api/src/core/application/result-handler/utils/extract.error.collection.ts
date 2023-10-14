import { ApplicationError } from '../../error/application.error'
import { Result } from '../result.handler'

export const extractErrorFromCollection = <T>(arr: Result<T>[]) =>
    arr.find((re) => re.isError())
