export type RetryHandler = <T, E extends Error = Error>(
    maxTry: number,
    tryCallback?: (numTry: number, error: E) => void,
) => (func: () => Promise<T>) => Promise<T>
