import { glob } from 'glob'
import { join } from 'node:path'
import { getCallStack } from 'src/utils/call-stack/get.call.stack'

export const initializeMethods = () => {
    const callStack = getCallStack()
    const filePath = callStack[1]
        .replaceAll('\\', '/')
        .split('/')
        .toSpliced(-1)
        .join('/')
    const data = glob.sync(join(filePath, `./*.method.js`).replace(/\\/g, '/'))
    return data.map((e) => {
        require(e)
    })
}
