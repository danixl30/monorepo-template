import { getCallSites } from 'node:util'

export const getCallStack = (): string[] => {
	const callSatck = getCallSites()
	return callSatck
		.map((e) => e.scriptName)
		.map((e) => e.replace('file:///', ''))
		.map((e) => (process.platform !== 'win32' ? '/' + e : e))
		.reverse()
}
