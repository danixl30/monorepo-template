import { Module } from '@nestjs/common'
import glob from 'glob'
import { dirname, join } from 'node:path'
import { objectValues } from '@mono/object-utils'
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const initializeModules = () => {
    const data = glob.sync(
        join(
            __dirname,
            '../../../**/infraestructure/modules/gateways/module.js',
        ).replace(/\\/g, '/'),
    )
    return data.asyncMap(async (e) => {
        const module = await import(e)
        return objectValues(module)[0]
    })
}

@Module({
    imports: await initializeModules(),
})
export class GatewayModule {}
