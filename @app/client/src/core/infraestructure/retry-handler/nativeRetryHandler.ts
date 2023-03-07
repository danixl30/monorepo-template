import { OnInit } from '../../application/on-init/on-init'
import { RetryHandler } from '../../application/retry-handler/retry-handler'
import { ValueProvider } from '../../application/value-provider/value-provider'

export const useRetryHandler = (
    onInit: OnInit,
    valueProvider: ValueProvider,
) => {
    const isMounted = valueProvider(true)

    onInit(() => {
        isMounted.value = true
        return () => {
            isMounted.value = false
        }
    })

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
            if (num === max || !isMounted.value) throw e
            onTry?.(num, e as E)
            return worker(++num, max, func, onTry)
        }
    }

    const retryHandler: RetryHandler =
        <T, E extends Error = Error>(
            numTry: number,
            tryCallback?: (numTry: number, error: E) => void,
        ) =>
        (func: () => Promise<T>): Promise<T> =>
            worker<T, E>(1, numTry, func, tryCallback)

    return retryHandler
}
