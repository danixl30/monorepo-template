import { glob } from 'node:fs/promises'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'
import { TypeClass } from '@mono/types-utils'
import { DynamicModule, ForwardReference, Module } from '@nestjs/common'
import { getCallStack } from 'src/utils/call-stack/get.call.stack'
import { loadDependencies } from '../../controllers/decorators/controller.module'

const initializeEventListeners = async (currentPath: string) => {
	const data = await Array.fromAsync(
		glob(
			join(
				currentPath,
				'../../event-listeners/**/*.event.listener.js',
			).replace(/\\/g, '/'),
		),
	)
	return data.asyncMap(async (e) => {
		const module = await import('file:///' + e)
		return objectValues(module)[0]
	})
}

export async function EventListenersModule(
	dependencies: (
		| TypeClass<object>
		| DynamicModule
		| Promise<DynamicModule>
		| ForwardReference
	)[] = [],
) {
	if (
		!dependencies?.every(
			(e: any) => e.__isBarrelModule || e.__isServiceModule,
		)
	)
		throw new Error('Invalid submodules for EventListenersModule')
	const callStack = getCallStack()
	const filePath = callStack[1]
		.replaceAll('\\', '/')
		.split('/')
		.toSpliced(-1)
		.join('/')
	dependencies.push(...(await loadDependencies(filePath)))
	const listeners = await initializeEventListeners(filePath)
	return function <T extends { new (...args: any[]): object }>(target: T) {
		;(target as any).__isEventListenerModule = true
		return Module({
			providers: listeners,
			imports: dependencies,
		})(target)
	}
}
