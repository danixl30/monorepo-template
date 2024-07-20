export type Scenario = {
	name: string
	given: {
		name: string
		body: (
			input: Record<string, string | number | boolean>,
		) => void | Promise<void>
	}
	when: {
		name: string
		body: (
			data: any,
			input: Record<string, string | number | boolean>,
		) => void | Promise<void>
	}
	then: {
		name: string
		body: (
			data: any,
			input: Record<string, string | number | boolean>,
		) => void | Promise<void>
	}
	afterAlls?: (() => void | Promise<void>)[]
	beforeAlls?: (() => void | Promise<void>)[]
	afterEarchs?: (() => void | Promise<void>)[]
	beforeEachs?: (() => void | Promise<void>)[]
}

export type ScenarioDeclaration = (
	name: string,
	scenario: Omit<Scenario, 'name'>,
) => Scenario | Promise<Scenario>
