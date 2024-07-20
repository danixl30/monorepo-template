import { initializeTests } from './loader'
import { nodeTestSuitDeclartion } from './declaration/test.declaration'
import { nodeTestingExpectation } from './expectation/expectatation'
import { nodeTestingFeatureDeclare } from './declaration/feature.declaration'
import { scenarioDeclare } from '../common/scenario-parser'

export const declareGroup = nodeTestSuitDeclartion
export const lookFor = nodeTestingExpectation
export const loader = initializeTests
export const declareFeature = nodeTestingFeatureDeclare
export const declareScenario = scenarioDeclare
