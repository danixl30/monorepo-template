import { ExpectationContract } from 'tests/unit/core/contracts/expectation.contract'
import assert from 'node:assert'

const empty = () => {
    console.log('empty')
}

export const nodeTestingExpectation: ExpectationContract = <T>(value: T) => ({
    equals: (valueToCompare: T) => assert.equal(value, valueToCompare),
    notEquals: (valueToCompare: T) => assert.notEqual(value, valueToCompare),
    toHaveLenght: empty,
    toNotHaveLenght: empty,
    toHavePropety: empty,
    toNotHavePropety: empty,
    toCloseTo: empty,
    toBeDefined: empty,
    toBeFalsy: empty,
    toBeGreaterThan: empty,
    toNotBeGreaterThan: empty,
    toBeGreaterThanOrEqual: empty,
    toNotBeGreaterThanOrEqual: empty,
    toBeLessThan: empty,
    toNotBeLessThan: empty,
    toBeLessThanOrEqual: empty,
    toNotBeLessThanOrEqual: empty,
    toBeNull: empty,
    toNotBeNull: empty,
    toBeTruthy: empty,
    toBeUndefined: empty,
    toBeNaN: empty,
    toNotBeNaN: empty,
    toDeepEqual: empty,
    toMatch: empty,
    toNotMatch: empty,
    toMathObject: empty,
    toBeError: empty,
    toBeErrorAsync: empty,
})
