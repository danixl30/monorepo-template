import { glob } from 'node:fs/promises'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'

export const initializeRepositories = async (folder: string) => {
	const repositoriesPart = await Array.fromAsync(
		glob(
			join(
				__dirname,
				`../../../../**/infraestructure/repositories/${folder}/**/index.js`,
			).replace(/\\/g, '/'),
		),
	)
	const repositoriesUni = await Array.fromAsync(
		glob(
			join(
				__dirname,
				`../../../../**/infraestructure/repositories/${folder}/*.repository.js`,
			).replace(/\\/g, '/'),
		),
	)
	return [...repositoriesUni, ...repositoriesPart].asyncMap(async (e) => {
		const module = await import('file:///' + e)
		return objectValues(module)[0]
	})
}
