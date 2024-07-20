import { Scenario } from './scenario.declaration'

export type FeatureDeclaration = (
	name: string,
	scenarios?: Scenario[],
) => void | Promise<void>
