import { getCallSite } from 'node:util'

declare module 'node:util' {
	export function getCallSite(frames?: number): {
		fuctionName: string
		scriptName: string
		lineNumber: number
		column: number
	}[]
}

export const getCallStack = (): string[] => {
	const callSatck = getCallSite()
	return callSatck
		.map((e) => e.scriptName)
		.map((e) => e.replace('file:///', ''))
		.map((e) => (process.platform !== 'win32' ? '/' + e : e))
		.reverse()
}
