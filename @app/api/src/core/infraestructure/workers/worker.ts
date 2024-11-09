import { randomUUID } from 'node:crypto'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { Worker } from 'node:worker_threads'
import { ArgumentTypes } from '@mono/types-utils'
import { getCallStack } from 'src/utils/call-stack/get.call.stack'

type UnwrapReturnType<T extends (...args: any[]) => any> = T extends (
	...args: any
) => infer U
	? U extends Promise<any>
		? U
		: Promise<U>
	: never

export const worker = <T extends (...args: any[]) => Promise<any>>(
	script: string,
	...args: ArgumentTypes<T>
): UnwrapReturnType<T> => {
	const callStack = getCallStack()
	const filePath = callStack[0]
		.replaceAll('\\', '/')
		.split('/')
		.toSpliced(-1)
		.join('/')
	const promise = Promise.withResolvers()
	const workerId = randomUUID()
	const worker = new Worker(
		pathToFileURL(join(__dirname, './runner/runner.js')),
		{
			workerData: {
				script: join(filePath, script),
				args,
				workerId,
			},
		},
	)
	worker.on('message', (data) => {
		if (data.workerId !== workerId) return
		if (data.error) return promise.reject(data.error)
		return promise.resolve(data.data)
	})
	worker.on('error', (error) => promise.reject(error))
	return promise.promise as UnwrapReturnType<T>
}
