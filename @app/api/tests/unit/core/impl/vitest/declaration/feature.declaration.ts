import { join } from 'node:path'
import { Scenario } from '@mono/test-utils'
import { globSync } from 'glob'
import { getCallStack } from 'src/utils/call-stack/get.call.stack'
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	it,
} from 'vitest'
import {
	parseFeatures,
	scenariosInputParser,
} from '../../common/gherkin-parser'

export const vitestFeatureDeclare = async (
	name: string,
	scenarios: Scenario[] = [],
) => {
	const callStack = getCallStack()
	const filePath = callStack[1]
		.replaceAll('\\', '/')
		.split('/')
		.toSpliced(-1)
		.join('/')
	const folderName = filePath.split('/').at(-1)
	const featuresPaths = globSync(
		join(process.cwd(), `./features/${folderName}/*.feature`).replace(
			/\\/g,
			'/',
		),
	)
	const features = parseFeatures(featuresPaths, name)
	const scenariosResolved = [
		...scenarios,
		...(await globSync(
			join(filePath, './**/scenario.js').replace(/\\/g, '/'),
		).asyncMap(async (path) => {
			const data = await import('file:///' + path)
			return data.scenario as Scenario
		})),
	]

	const scenariosWithInput = scenariosInputParser(scenariosResolved, features)

	describe('Feature: ' + name, () => {
		scenariosWithInput.map((e) => {
			describe('Scenario: ' + e.name, () => {
				e.afterAlls?.map((e) => afterAll(e))
				e.afterEarchs?.map((e) => afterEach(e))
				e.beforeEachs?.map((e) => beforeEach(e))
				e.beforeAlls?.map((e) => beforeAll(e))
				let globalData: any
				it('Given: ' + e.given.name, async () => {
					globalData = await e.given.body(e.givenInput as any)
				})
				it('When: ' + e.when.name, async () => {
					globalData = await e.when.body(
						globalData,
						e.whenInput as any,
					)
				})
				it('Then: ' + e.then.name, async () => {
					await e.then.body(globalData, e.thenInput as any)
				})
			})
		})
	})
}