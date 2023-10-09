import { initializeTests } from './loader'
import { nodeTestSuitDeclartion } from './declaration/test.declaration'
import { nodeTestingExpectation } from './expectation/expectatation'

export const suitDeclare = nodeTestSuitDeclartion
export const expect = nodeTestingExpectation
export const loader = initializeTests
