import glob from 'glob'
import { dirname, join } from 'node:path'
import { objectValues } from '@mono/object-utils'
import { fileURLToPath } from 'node:url';
import { BarrelModule } from '../decorators/barrel.module'

const __dirname = dirname(fileURLToPath(import.meta.url));

const initializeModules = () => {
    const data = glob.sync(
        join(
            __dirname,
            '../../../**/infraestructure/modules/event-listeners/module.js',
        ).replace(/\\/g, '/'),
    )
    return data.asyncMap(async (e) => {
        const module = await import(e)
        return objectValues(module)[0]
    })
}

@BarrelModule(await initializeModules())
export class EventListenerModule {}
