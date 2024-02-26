import { ExpectationContract } from '@mono/test-utils'
import { expect } from '@jest/globals'

export const jestExpectation: ExpectationContract = <T>(value: T) => ({
    equals: (valueToCompare: T) => expect(value).toBe(valueToCompare),
    notEquals: (valueToCompare: T) => expect(value).not.toBe(valueToCompare),
    toHaveLenght: (number: number) => expect(value).toHaveLength(number),
    toNotHaveLenght: (number: number) => expect(value).not.toHaveLength(number),
    toHavePropety: (path: string | string[], valueInPath?: any) =>
        expect(value).toHaveProperty(path, valueInPath),
    toNotHavePropety: (path: string | string[], valueInPath?: any) =>
        expect(value).not.toHaveProperty(path, valueInPath),
    toCloseTo: (number: number) => expect(value).toBeCloseTo(number),
    toBeDefined: () => expect(value).toBeDefined(),
    toBeFalsy: () => expect(value).toBeFalsy(),
    toBeGreaterThan: (number: number | bigint) =>
        expect(value).toBeGreaterThan(number),
    toNotBeGreaterThan: (number: number | bigint) =>
        expect(value).not.toBeGreaterThan(number),
    toBeGreaterThanOrEqual: (number: number | bigint) =>
        expect(value).toBeGreaterThanOrEqual(number),
    toNotBeGreaterThanOrEqual: (number: number | bigint) =>
        expect(value).not.toBeGreaterThanOrEqual(number),
    toBeLessThan: (number: number | bigint) =>
        expect(value).toBeLessThan(number),
    toNotBeLessThan: (number: number | bigint) =>
        expect(value).not.toBeLessThan(number),
    toBeLessThanOrEqual: (number: number | bigint) =>
        expect(value).toBeLessThanOrEqual(number),
    toNotBeLessThanOrEqual: (number: number | bigint) =>
        expect(value).not.toBeLessThanOrEqual(number),
    toBeNull: () => expect(value).toBeNull(),
    toNotBeNull: () => expect(value).not.toBeNull(),
    toBeTruthy: () => expect(value).toBeTruthy(),
    toBeUndefined: () => expect(value).toBeUndefined(),
    toBeNaN: () => expect(value).toBeNaN(),
    toNotBeNaN: () => expect(value).not.toBeNaN(),
    toDeepEqual: (valueToCompare: object) =>
        expect(value).toEqual(valueToCompare),
    toMatch: (regExp: string | RegExp) => expect(value).toMatch(regExp),
    toNotMatch: (regExp: string | RegExp) => expect(value).not.toMatch(regExp),
    toMathObject: (valueToCompare: object) =>
        expect(value).toMatchObject(valueToCompare as any),
    toBeError: (error: Error | string) => expect(value).toThrow(error),
    toBeErrorAsync: (error: Error | string) =>
        expect(value).rejects.toThrow(error),
})
