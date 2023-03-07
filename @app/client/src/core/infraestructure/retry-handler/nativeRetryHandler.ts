import { RetryHandler } from '../../application/retry-handler/retry-handler'

const worker = async <T, E extends Error>(
    num: number,
    max: number,
    func: () => Promise<T>,
    onTry?: (numTry: number, error: E) => void,
): Promise<T> => {
    try {
        const res = await func()
        return res
    } catch (e) {
        if (num === max) throw e
        onTry?.(num, e as E)
        return worker(++num, max, func, onTry)
    }
}

export const useRetryHandler: RetryHandler =
    <T, E extends Error = Error>(
        numTry: number,
        tryCallback?: (numTry: number, error: E) => void,
    ) =>
        (func: () => Promise<T>): Promise<T> =>
            worker<T, E>(1, numTry, func, tryCallback)
