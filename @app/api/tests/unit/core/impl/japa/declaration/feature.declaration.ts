import { globSync } from 'node:fs'
import { join } from 'node:path'
import { test } from '@japa/runner'
import { Scenario } from '@mono/test-utils'
import { getCallStack } from 'src/utils/call-stack/get.call.stack'
import {
	parseFeatures,
	scenariosInputParser,
} from '../../common/gherkin-parser'

export const japaFeatureDeclare = async (
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
	scenariosWithInput.map((e) => {
		test.group(
			'Feature: ' + name + ' -- Scenario: ' + e.name,
			(group: any) => {
				e.afterAlls?.map((after) => group.teardown(after))
				e.beforeAlls?.map((before) => group.setup(before))
				e.afterEarchs?.map((after) => group.each.teardown(after))
				e.beforeEachs?.map((before) => group.each.setup(before))
				let globalData: any
				test('Given: ' + e.given.name, async () => {
					globalData = await e.given.body(e.givenInput as any)
				})
				test('When: ' + e.when.name, async () => {
					globalData = await e.when.body(
						globalData,
						e.whenInput as any,
					)
				})
				test('Then: ' + e.then.name, async () => {
					await e.then.body(globalData, e.thenInput as any)
				})
			},
		)
	})
}
