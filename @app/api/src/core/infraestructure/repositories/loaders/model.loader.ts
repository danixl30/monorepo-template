import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { objectValues } from '@mono/object-utils'
import { globSync } from 'glob'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const initializeModels = (prefix: string, folder: string) => {
	const data = globSync(
		join(
			__dirname,
			`../../../../**/infraestructure/models/${folder}/*.${prefix}.js`,
		).replace(/\\/g, '/'),
	)
	return data.asyncMap(async (e) => {
		const module = await import('file:///' + e)
		return objectValues(module)[0]
	})
}
