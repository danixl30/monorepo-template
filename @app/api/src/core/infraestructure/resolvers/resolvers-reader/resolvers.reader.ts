import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'
import { globSync } from 'glob'

export const initializeResolvers = (currentPath: string) => {
	const data = globSync(
		join(currentPath, '../../resolvers/**/*.resolver.js').replace(
			/\\/g,
			'/',
		),
	)
	return data.asyncMap(async (e) => {
		const module = await import('file:///' + e)
		return objectValues(module)[0]
	})
}
