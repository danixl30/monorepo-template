import '@mono/array-methods'
import '@mono/promise-methods'
import '@mono/string-methods'
import '@mono/number-methods'
import '@mono/object-utils'
import '@mono/date-methods'
import { join } from 'node:path'
import { globSync } from 'node:fs'

const importTestSuits = () => {
	const data = [
		...globSync(
			join(__dirname, '../../../../**/groups/**/group.tests.js').replace(
				/\\/g,
				'/',
			),
		),
		...globSync(
			join(__dirname, '../../../../features/**/feature.js').replace(
				/\\/g,
				'/',
			),
		),
	]
	return data.asyncMap((e) => import('file:///' + e))
}

await importTestSuits()
