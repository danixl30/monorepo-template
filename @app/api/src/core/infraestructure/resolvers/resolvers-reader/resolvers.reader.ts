import { glob } from 'glob'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'

export const initializeResolvers = (currentPath: string) => {
    const data = glob.sync(
        join(currentPath, '../../resolvers/**/*.resolver.js').replace(
            /\\/g,
            '/',
        ),
    )
    return data.map((e) => {
        const module = require(e)
        return objectValues(module)[0]
    })
}
