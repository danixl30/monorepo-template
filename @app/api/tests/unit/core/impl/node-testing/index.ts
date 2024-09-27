import { scenarioDeclare } from '../common/scenario-parser'
import { nodeTestingFeatureDeclare } from './declaration/feature.declaration'
import { nodeTestSuitDeclartion } from './declaration/test.declaration'
import { nodeTestingExpectation } from './expectation/expectatation'
import { initializeTests } from './loader'

export const declareGroup = nodeTestSuitDeclartion
export const lookFor = nodeTestingExpectation
export const loader = initializeTests
export const declareFeature = nodeTestingFeatureDeclare
export const declareScenario = scenarioDeclare
