import { glob } from 'node:fs/promises'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'

export const initializeModels = async (prefix: string, folder: string) => {
	const data = await Array.fromAsync(
		glob(
			join(
				__dirname,
				`../../../../**/infraestructure/models/${folder}/*.${prefix}.js`,
			).replace(/\\/g, '/'),
		),
	)
	return data.asyncMap(async (e) => {
		const module = await import('file:///' + e)
		return objectValues(module)[0]
	})
}
