import glob from 'glob'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'

const {globSync} = glob

export const initializeControllers = (currentPath: string) => {
    const data = globSync(
        join(currentPath, '../../controllers/**/*.controller.js').replace(
            /\\/g,
            '/',
        ),
    )
    return data.map((e) => {
        const module = require(e)
        return objectValues(module)[0]
    })
}
