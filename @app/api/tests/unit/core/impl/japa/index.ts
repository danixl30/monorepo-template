import { initializeTests } from './loader'
import { japaTestSuitDeclartion } from './declaration/test.declaration'
import { japaTestingExpectation } from './expectation/expectatation'
import { japaFeatureDeclare } from './declaration/feature.declaration'
import { scenarioDeclare } from '../common/scenario-parser'

export const declareGroup = japaTestSuitDeclartion
export const lookFor = japaTestingExpectation
export const loader = initializeTests
export const declareFeature = japaFeatureDeclare
export const declareScenario = scenarioDeclare
