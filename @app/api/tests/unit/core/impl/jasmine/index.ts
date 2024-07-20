import { scenarioDeclare } from '../common/scenario-parser'
import { jasmineFeatureDeclare } from './declaration/feature.declaration'
import { jasmineTestSuitDeclartion } from './declaration/test.declaration'
import { jasmineExpectation } from './expectation/expectatation'
import { initializeTests } from './loader'

export const declareGroup = jasmineTestSuitDeclartion
export const lookFor = jasmineExpectation
export const loader = initializeTests
export const declareFeature = jasmineFeatureDeclare
export const declareScenario = scenarioDeclare
