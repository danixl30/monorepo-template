import '@mono/array-methods'
import '@mono/string-methods'
import '@mono/number-methods'
import '@mono/object-utils'
import glob from 'glob'
import { join } from 'node:path'

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
