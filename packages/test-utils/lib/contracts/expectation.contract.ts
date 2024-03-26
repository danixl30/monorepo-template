export type ExpectationContract = <T>(value: T) => {
    equals(value: T): void
    notEquals(value: T): void
    toHaveLenght: (number: number) => void
    toNotHaveLenght: (number: number) => void
    toHavePropety: (path: string | string[], valueInPath?: any) => void
    toNotHavePropety: (path: string | string[], valueInPath?: any) => void
    toCloseTo: (number: number) => void
    toBeDefined: () => void
    toBeFalsy: () => void
    toBeGreaterThan: (number: number | bigint) => void
    toNotBeGreaterThan: (number: number | bigint) => void
    toBeGreaterThanOrEqual: (number: number | bigint) => void
    toNotBeGreaterThanOrEqual: (number: number | bigint) => void
    toBeLessThan: (number: number | bigint) => void
    toNotBeLessThan: (number: number | bigint) => void
    toBeLessThanOrEqual: (number: number | bigint) => void
    toNotBeLessThanOrEqual: (number: number | bigint) => void
    toBeNull: () => void
    toNotBeNull: () => void
    toBeTruthy: () => void
    toBeUndefined: () => void
    toBeNaN: () => void
    toNotBeNaN: () => void
    toDeepEqual: (valueToCompare: object) => void
    toMatch: (regExp: string | RegExp) => void
    toNotMatch: (regExp: string | RegExp) => void
    toMathObject: (valueToCompare: object) => void
    toBeError: (error?: Error | string) => void
    asyncResolve(manager?: (value: Awaited<T>) => void): Promise<void>
    asyncReject<U = unknown>(manager?: (err: U) => void): Promise<void>
}
