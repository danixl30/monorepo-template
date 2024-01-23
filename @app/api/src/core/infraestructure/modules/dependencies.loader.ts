import { glob } from 'glob'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'
import { getCallStack } from 'src/utils/call-stack/get.call.stack'

export const loadDependencies = () => {
    const currentPath = getCallStack()[1]
    const filePath = currentPath
        .replaceAll('\\', '/')
        .split('/')
        .toSpliced(-1)
        .join('/')
    const data = glob.sync(
        join(filePath, './dependencies/*.dependency.js').replace(/\\/g, '/'),
    )
    return data.map((e) => {
        const module = require(e)
        return objectValues(module)[0]
    })
}
