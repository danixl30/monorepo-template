import '@mono/array-methods'
import '@mono/string-methods'
import '@mono/number-methods'
import '@mono/object-utils'
import glob from 'glob'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const importTestSuits = () => {
    const data = glob.sync(
        join(__dirname, '../../../../suits/**/suit.tests.js').replace(
            /\\/g,
            '/',
        ),
    )
    return data.asyncMap((e) => import('file:///' + e))
}

await importTestSuits()
