import { jestSuitDeclartion } from './declaration/test.declaration'
import { jestExpectation } from './expectation/test.expectation'
import { initializeTests } from './loader'

export const suitDeclare = jestSuitDeclartion
export const expect = jestExpectation
export const loader = initializeTests
