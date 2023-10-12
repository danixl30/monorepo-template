import { glob } from 'glob'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'

export const initializeGatewayss = (currentPath: string) => {
    const data = glob.sync(
        join(currentPath, '../../gateways/*.gateway.js').replace(/\\/g, '/'),
    )
    return data.map((e) => {
        const module = require(e)
        return objectValues(module)[0]
    })
}
