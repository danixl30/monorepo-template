import { glob } from 'node:fs/promises'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'

export const initializeEventListeners = async (currentPath: string) => {
	const data = await Array.fromAsync(
		glob(
			join(
				currentPath,
				'../../event-listeners/**/*.event.listener.js',
			).replace(/\\/g, '/'),
		),
	)
	return data.map((e) => {
		const module = require('file:///' + e)
		return objectValues(module)[0]
	})
}
