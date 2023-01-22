import { objectValues } from '@mono/object-utils'
import { Module } from '@nestjs/common'
import { glob } from 'glob'
import { join } from 'node:path'

const initializeModules = () => {
    const data = glob.sync(
        join(
            __dirname,
            '../../../**/**/modules/*.event.listener.module.js',
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
export class EventListenerModule {}
