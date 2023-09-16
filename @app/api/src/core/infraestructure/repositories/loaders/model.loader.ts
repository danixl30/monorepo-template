import { glob } from 'glob'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'

export const initializeModels = (prefix: string, folder: string) => {
    const data = glob.sync(
        join(
            __dirname,
            `../../../../**/infraestructure/models/${folder}/*.${prefix}.js`,
        ).replace(/\\/g, '/'),
    )
    return data.map((e) => {
        const module = require(e)
        return objectValues(module)[0]
    })
}
