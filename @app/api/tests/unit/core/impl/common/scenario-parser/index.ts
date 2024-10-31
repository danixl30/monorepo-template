import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'
import { Scenario } from '@mono/test-utils'
import { getCallStack } from 'src/utils/call-stack/get.call.stack'
import { globSync } from 'node:fs'

const importHook = async (e: string) => {
	const module = await import('file:///' + e)
	return objectValues(module)[0]
}

export const scenarioDeclare = async (
	name: string,
	scenario?: Omit<Scenario, 'name'>,
) => {
	if (scenario)
		return {
			name,
			...scenario,
		}
	const callStack = getCallStack()
	const filePath = callStack[1]
		.replaceAll('\\', '/')
		.split('/')
		.toSpliced(-1)
		.join('/')
	const pathsBeforeEachs: string[] = globSync(
		join(filePath, './*.beforeEach.js').replace(/\\/g, '/'),
	)
	const pathsBeforeAlls: string[] = globSync(
		join(filePath, './*.before.js').replace(/\\/g, '/'),
	)
	const pathsAfterEachs: string[] = globSync(
		join(filePath, './*.afterEach.js').replace(/\\/g, '/'),
	)
	const pathsAfterAlls: string[] = globSync(
		join(filePath, './*.after.js').replace(/\\/g, '/'),
	)
	const afterAlls = [...(await pathsAfterAlls.asyncMap(importHook))]
	const beforeAlls = [...(await pathsBeforeAlls.asyncMap(importHook))]
	const afterEachs = [...(await pathsAfterEachs.asyncMap(importHook))]
	const beforeEachs = [...(await pathsBeforeEachs.asyncMap(importHook))]
	const given = await import('file:///' + filePath + '/given.js')
	const when = await import('file:///' + filePath + '/when.js')
	const then = await import('file:///' + filePath + '/then.js')
	return {
		name,
		given,
		when,
		then,
		beforeAlls,
		afterAlls,
		beforeEachs,
		afterEachs,
	}
}
