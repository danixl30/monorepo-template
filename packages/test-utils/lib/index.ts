import '@mono/array-methods'
import { ExpectationContract } from './contracts/expectation.contract'
import { SuitDeclaration, TestDeclaration } from './contracts/test.declaration'
import { ScenarioDeclaration } from 'contracts/scenario.declaration'
import { FeatureDeclaration } from 'contracts/feature.declaration'
export * from './mocks/class.mock'
export * from './mocks/function.mock'
export * from './contracts/expectation.contract'
export * from './contracts/scenario.declaration'
export * from './contracts/feature.declaration'
export * from './contracts/function.mock'
export * from './contracts/test.declaration'

declare global {
    const lookFor: ExpectationContract
    const declareGroup: SuitDeclaration
    const declareScenario: ScenarioDeclaration
    const declareFeature: FeatureDeclaration
    function loader(): Promise<TestDeclaration[]>
}
