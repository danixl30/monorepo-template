import { glob } from 'node:fs/promises'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'

export const initializeGatewayss = async (currentPath: string) => {
	const data = await Array.fromAsync(
		glob(
			join(currentPath, '../../gateways/*.gateway.js').replace(
				/\\/g,
				'/',
			),
		),
	)
	return data.asyncMap(async (e) => {
		const module = await import('file:///' + e)
		return objectValues(module)[0]
	})
}
