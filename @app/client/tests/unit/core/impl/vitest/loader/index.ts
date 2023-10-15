import { glob } from 'glob'
import { join } from 'node:path'
import '@mono/array-methods'

export const initializeTests = (currentPath: string) => {
    const data = glob.sync(
        join(currentPath, './tests/*.test.ts').replace(/\\/g, '/'),
    )
    return data.asyncMap(async (e) => {
        const module = await import(e)
        if (!module.name || !module.body)
            throw new Error('Invalid test case from path: ' + e)
        return module
    })
}
