import { glob } from 'glob'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'
import { BarrelModule } from '../decorators/barrel.module'

const initializeModules = () => {
    const data = glob.sync(
        join(
            __dirname,
            '../../../**/infraestructure/modules/resolvers/module.js',
        ).replace(/\\/g, '/'),
    )
    return data.map((e) => {
        const module = objectValues(require(e))[0]
        if (!(module as any).__isResolverModule)
            throw new Error('Invalid resolver module')
        return module
    })
}

@BarrelModule(initializeModules())
export class ResolversModule {}
