import { glob } from 'node:fs/promises'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'
import { BarrelModule } from '../decorators/barrel.module'

const initializeModules = async () => {
	const data = await Array.fromAsync(
		glob(
			join(
				__dirname,
				'../../../**/infraestructure/modules/resolvers/module.js',
			).replace(/\\/g, '/'),
		),
	)
	return data.asyncMap(async (e) => {
		const module = await import('file:///' + e)
		return objectValues(module)[0]
	})
}
@BarrelModule(await initializeModules())
export class ResolversModule {}
