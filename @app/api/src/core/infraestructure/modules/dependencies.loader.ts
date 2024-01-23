import glob from 'glob'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'

export const loadDependencies = (currentPath: string) => {
    const data = glob.sync(
        join(currentPath, './dependencies/*.dependency.js').replace(/\\/g, '/'),
    )
    return data.asyncMap(async (e) => {
        const module = await import(e)
        return objectValues(module)[0]
    })
}
