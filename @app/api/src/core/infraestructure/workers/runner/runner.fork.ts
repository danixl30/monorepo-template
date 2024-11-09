import { pathToFileURL } from 'node:url'
import '@mono/array-methods'
import '@mono/promise-methods'
import '@mono/string-methods'
import '@mono/number-methods'
import '@mono/object-utils'
import '@mono/date-methods'
import '@mono/boolean-methods'
import '@mono/map-methods'

process.on('message', async (msg) => {
	const workerData = msg as Record<any, any>
	const target: {
		run(...args: any): Promise<any>
	} = await import(pathToFileURL(workerData.script).href)

	const [error, data] = await target
		.run(...workerData.args)
		.destructurePromise()
	process.send?.({
		workerId: workerData.workerId,
		error,
		data,
	})
})
