import { initializeTests } from './loader'
import { vitestExpectation } from './expectation/expectation'
import { vitestSuitDeclartion } from './declaration/test.declaration'

export const expect = vitestExpectation
export const suitDeclare = vitestSuitDeclartion
export const loader = initializeTests
