import { glob } from 'glob'
import { join } from 'node:path'

export const initializeMethods = (__dirname: string) => {
    const data = glob.sync(join(__dirname, `./*.method.js`).replace(/\\/g, '/'))
    return data.map((e) => {
        require(e)
    })
}
