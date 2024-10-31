import { glob } from 'node:fs/promises'
import { join } from 'node:path'
import { getCallStack } from 'src/utils/call-stack/get.call.stack'

export const initializeMethods = async () => {
	const callStack = getCallStack()
	const filePath = callStack[1]
		.replaceAll('\\', '/')
		.split('/')
		.toSpliced(-1)
		.join('/')
	const data = await Array.fromAsync(
		glob(join(filePath, `./*.method.js`).replace(/\\/g, '/')),
	)
	return data.map((e) => {
		import(e)
	})
}
