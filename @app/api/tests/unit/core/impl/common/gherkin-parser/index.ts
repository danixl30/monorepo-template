import { readFileSync } from 'node:fs'
import { Scenario } from '@mono/test-utils'

const parseStr = (str: string) => {
	if (str.startsWith('"') && str.endsWith('"'))
		return str.substring(1, str.length - 1)
	return str
}

const parseName = (doc: string, test: string) => {
	const docElements =
		(doc.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g) as string[]) ?? []
	const testElewents =
		(test.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g) as string[]) ?? []
	return docElements.reduce(
		(acc, e, index) => {
			if (e === testElewents[index]) return acc
			if (testElewents[index].startsWith('$') && testElewents.length > 1)
				return {
					...acc,
					[testElewents[index].replace('$', '')]: !Number.isNaN(
						Number(e),
					)
						? Number(e)
						: e === 'true'
							? true
							: e === 'false'
								? false
								: parseStr(e),
				}
			throw new Error(`Elements mismatch: ${e} ${testElewents[index]}`)
		},
		{} as Record<string, string | number | boolean>,
	)
}

export const parseFeatures = (paths: string[], name: string) => {
	return paths.map((path) => {
		const data = readFileSync(path, {
			encoding: 'utf8',
		})
		const lines = data.split('\n').map((e) => e.trim())
		let feature = ''
		let scenario = ''
		let given = ''
		let when = ''
		let then = ''
		let rule = ''
		const givenTable: string[] = []
		const whenTable: string[] = []
		const thenTable: string[] = []
		for (let index = 0; index < lines.length; index++) {
			if (lines[index].startsWith('Feature:')) {
				feature += lines[index].replace('Feature:', '').trim()
				index++
				while (
					!lines[index].startsWith('Scenario:') &&
					!lines[index].startsWith('Rule:') &&
					index < lines.length
				) {
					if (!lines[index].startsWith('#'))
						feature += ' ' + lines[index]
					index++
				}
				while (
					!lines[index].startsWith('Scenario:') &&
					index < lines.length
				) {
					if (!lines[index].startsWith('#'))
						rule += ' ' + lines[index]
					index++
				}
			}
			if (lines[index].startsWith('Scenario:')) {
				scenario += lines[index].replace('Scenario:', '').trim()
				index++
				while (
					!lines[index].startsWith('Given') &&
					index < lines.length
				) {
					if (!lines[index].startsWith('#'))
						scenario += ' ' + lines[index]
					index++
				}
			}
			if (lines[index].startsWith('Given')) {
				given += lines[index].replace('Given', '').trim()
				index++
				while (
					!lines[index].startsWith('When') &&
					index < lines.length
				) {
					if (
						lines[index].startsWith('|') &&
						lines[index].endsWith('|')
					) {
						givenTable.push(
							lines[index]
								.substring(1, lines[index].length - 1)
								.trim(),
						)
						index++
						continue
					}
					if (!lines[index].startsWith('#'))
						given += ' ' + lines[index]
					index++
				}
			}
			if (lines[index].startsWith('When')) {
				when += lines[index].replace('When', '').trim()
				index++
				while (
					!lines[index].startsWith('Then') &&
					index < lines.length
				) {
					if (
						lines[index].startsWith('|') &&
						lines[index].endsWith('|')
					) {
						whenTable.push(
							lines[index]
								.substring(1, lines[index].length - 1)
								.trim(),
						)
						index++
						continue
					}
					if (!lines[index].startsWith('#'))
						when += ' ' + lines[index]
					index++
				}
			}
			if (lines[index].startsWith('Then')) {
				then += lines[index].replace('Then', '').trim()
				index++
				while (lines[index] !== '' && index < lines.length) {
					if (
						lines[index].startsWith('|') &&
						lines[index].endsWith('|')
					) {
						thenTable.push(
							lines[index]
								.substring(1, lines[index].length - 1)
								.trim(),
						)
						index++
						continue
					}
					if (!lines[index].startsWith('#'))
						then += ' ' + lines[index]
					index++
				}
			}
		}
		if (feature.trim() !== name.split('\n').join(' ').trim())
			throw new Error('Feature mismatch...')
		return {
			scenario,
			given,
			when,
			then,
			rule: rule.trim(),
			whenTable,
			givenTable,
			thenTable,
		}
	})
}

const parseTableName = (data: string[]) =>
	'\n' + data.map((e) => `| ${e} |`).join('\n')

const parseTableInput = (data: string[], input: Record<any, any>) => {
	if (data.length === 1) {
		input['array'] = data[0].split('|').map((e) => parseStr(e.trim()))
	} else {
		const firstTitleRow = data[0].split('|').map((e) => parseStr(e.trim()))
		data.shift()
		const tableParsed = data.reduce(
			(acc, e) => {
				const record = {}
				const data = e.split('|').map((e) => parseStr(e.trim()))
				firstTitleRow.forEach((e, i) => (record[e] = data[i]))
				return [...acc, record]
			},
			[] as Record<any, any>[],
		)
		input['table'] = tableParsed
	}
}

export const scenariosInputParser = (
	scenarios: Scenario[],
	features: {
		scenario: string
		given: string
		when: string
		then: string
		givenTable: string[]
		whenTable: string[]
		thenTable: string[]
	}[],
) => {
	return scenarios.map((scenario) => {
		const scenarioCopy = {
			...scenario,
			given: {
				...scenario.given,
			},
			when: {
				...scenario.when,
			},
			then: {
				...scenario.then,
			},
		}
		const scenarioDoc = features.find(
			(e) => scenarioCopy.name === e.scenario,
		)
		if (!scenarioDoc)
			throw new Error(
				`Scenario ${scenarioDoc!.scenario} not found on docs`,
			)
		const givenInput: Record<any, any> = parseName(
			scenarioDoc.given,
			scenarioCopy.given.name,
		)
		Object.keys(givenInput).forEach((e) => {
			scenarioCopy.given.name = scenarioCopy.given.name.replace(
				`$${e}`,
				String(givenInput[e]),
			)
		})
		if (scenarioDoc.givenTable.isNotEmpty()) {
			scenarioCopy.given.name += parseTableName(scenarioDoc.givenTable)
			parseTableInput(scenarioDoc.givenTable, givenInput)
		}
		const thenInput: Record<any, any> = parseName(
			scenarioDoc.then,
			scenarioCopy.then.name,
		)
		Object.keys(thenInput).forEach((e) => {
			scenarioCopy.then.name = scenarioCopy.then.name.replace(
				`$${e}`,
				String(thenInput[e]),
			)
		})
		if (scenarioDoc.whenTable.isNotEmpty()) {
			scenarioCopy.when.name += parseTableName(scenarioDoc.whenTable)
			parseTableInput(scenarioDoc.whenTable, givenInput)
		}
		const whenInput: Record<any, any> = parseName(
			scenarioDoc.when,
			scenarioCopy.when.name,
		)
		Object.keys(whenInput).forEach((e) => {
			scenarioCopy.when.name = scenarioCopy.when.name.replace(
				`$${e}`,
				String(whenInput[e]),
			)
		})
		if (scenarioDoc.thenTable.isNotEmpty()) {
			scenarioCopy.then.name += parseTableName(scenarioDoc.thenTable)
			parseTableInput(scenarioDoc.thenTable, givenInput)
		}
		return {
			...scenarioCopy,
			givenInput,
			whenInput,
			thenInput,
		}
	})
}
