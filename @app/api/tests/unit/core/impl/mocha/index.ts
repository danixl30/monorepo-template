import { scenarioDeclare } from '../common/scenario-parser'
import { mochaFeatureDeclare } from './declaration/feature.declaration'
import { mochaTestSuitDeclartion } from './declaration/test.declaration'
import { mochaTestingExpectation } from './expectation/expectatation'
import { initializeTests } from './loader'

export const declareGroup = mochaTestSuitDeclartion
export const lookFor = mochaTestingExpectation
export const loader = initializeTests
export const declareFeature = mochaFeatureDeclare
export const declareScenario = scenarioDeclare
