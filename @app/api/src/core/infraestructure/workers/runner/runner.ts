import { pathToFileURL } from 'node:url'
import { isMainThread, parentPort, workerData } from 'node:worker_threads'
import '@mono/array-methods'
import '@mono/promise-methods'
import '@mono/string-methods'
import '@mono/number-methods'
import '@mono/object-utils'
import '@mono/date-methods'
import '@mono/boolean-methods'
import '@mono/map-methods'

if (isMainThread) throw new Error('Runner is only for threads')

const target: {
	run(...args: any): Promise<any>
} = await import(pathToFileURL(workerData.script).href)

const [error, data] = await target.run(...workerData.args).destructurePromise()

parentPort?.postMessage({
	workerId: workerData.workerId,
	error,
	data,
})
