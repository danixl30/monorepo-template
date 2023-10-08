import { glob } from 'glob'
import { join } from 'node:path'

export const initializeTests = (currentPath: string) => {
    const data = glob.sync(
        join(currentPath, './tests/*.test.ts').replace(/\\/g, '/'),
    )
    return data.map((e) => {
        const module = require(e)
        return module
    })
}
