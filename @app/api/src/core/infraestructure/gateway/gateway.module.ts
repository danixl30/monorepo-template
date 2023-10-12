import { Module } from '@nestjs/common'
import { glob } from 'glob'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'

const initializeModules = () => {
    const data = glob.sync(
        join(
            __dirname,
            '../../../**/infraestructure/modules/gateways/module.js',
        ).replace(/\\/g, '/'),
    )
    return data.map((e) => {
        const module = require(e)
        return objectValues(module)[0]
    })
}

@Module({
    imports: initializeModules(),
})
export class GatewayModule {}
