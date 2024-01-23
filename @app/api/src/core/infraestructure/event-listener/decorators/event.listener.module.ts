import { glob } from 'glob'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'
import { TypeClass } from '@mono/types-utils'
import { getCallStack } from 'src/utils/call-stack/get.call.stack'
import { DynamicModule, ForwardReference, Module } from '@nestjs/common'

const initializeEventListeners = (currentPath: string) => {
    const data = glob.sync(
        join(
            currentPath,
            '../../event-listeners/**/*.event.listener.js',
        ).replace(/\\/g, '/'),
    )
    return data.map((e) => {
        const module = require(e)
        return objectValues(module)[0]
    })
}

export function EventListenersModule(
    dependencies?: (
        | TypeClass<object>
        | DynamicModule
        | Promise<DynamicModule>
        | ForwardReference
    )[],
) {
    if (
        !dependencies?.every(
            (e: any) => e.__isBarrelModule || e.__isServiceModule,
        )
    )
        throw new Error('Invalid submodules for EventListenersModule')
    const callStack = getCallStack()
    const filePath = callStack[1]
        .replaceAll('\\', '/')
        .split('/')
        .toSpliced(-1)
        .join('/')
    return function <T extends { new (...args: any[]): object }>(target: T) {
        ;(target as any).__isEventListenerModule = true
        return Module({
            providers: initializeEventListeners(filePath),
            imports: dependencies,
        })(target)
    }
}
