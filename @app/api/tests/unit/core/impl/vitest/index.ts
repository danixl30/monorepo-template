import { scenarioDeclare } from '../common/scenario-parser'
import { vitestFeatureDeclare } from './declaration/feature.declaration'
import { vitestSuitDeclartion } from './declaration/test.declaration'
import { vitestExpectation } from './expectation/test.expectation'
import { initializeTests } from './loader'

export const declareGroup = vitestSuitDeclartion
export const lookFor = vitestExpectation
export const loader = initializeTests
export const declareFeature = vitestFeatureDeclare
export const declareScenario = scenarioDeclare
