import { ArgumentTypes, ReturnType } from '@mono/types-utils'
import { MockFunction, MockFunctionAsync } from '../../contracts/function.mock'

// eslint-disable-next-line @typescript-eslint/ban-types
export const createFunctionMock = <T extends Function, R = ReturnType<T>>(
    func: (...args: ArgumentTypes<T>) => R,
): MockFunction<T, R> => {
    const mock: MockFunction<T, R> = function (...args: ArgumentTypes<T>): R {
        if (
            mock.customReturns.isEmpty() ||
            mock.currentCustomReturn >= mock.customReturns.length
        ) {
            const result = func(...args)
            mock.calls.push({
                args,
                returnValue: result,
            })
            return result
        }
        const result = mock.customReturns[mock.currentCustomReturn]
        mock.calls.push({
            args,
            returnValue: result,
        })
        mock.currentCustomReturn++
        return result
    }
    mock.currentCustomReturn = 0
    mock.customReturns = []
    mock.addCustomReturn = (data: R) => mock.customReturns.push(data)
    mock.calls = []
    mock.cleanCustomReturns = () => {
        mock.currentCustomReturn = 0
        mock.customReturns = []
    }
    return mock
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const createFunctionMockAsync = <T extends Function, R>(
    func: (...args: ArgumentTypes<T>) => Promise<R>,
): MockFunctionAsync<T, R> => {
    const mock: MockFunctionAsync<T, R> = async function (
        ...args: ArgumentTypes<T>
    ): Promise<R> {
        if (
            mock.customReturns.isEmpty() ||
            mock.currentCustomReturn >= mock.customReturns.length
        ) {
            const result = await func(...args)
            mock.calls.push({
                args,
                returnValue: result,
            })
            return result
        }
        const result = mock.customReturns[mock.currentCustomReturn]
        mock.calls.push({
            args,
            returnValue: result,
        })
        mock.currentCustomReturn++
        return result
    }
    mock.currentCustomReturn = 0
    mock.customReturns = []
    mock.addCustomReturn = (data: R) => mock.customReturns.push(data)
    mock.calls = []
    mock.cleanCustomReturns = () => {
        mock.currentCustomReturn = 0
        mock.customReturns = []
    }
    return mock
}
