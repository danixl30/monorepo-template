type CallBackFilter<T> = (value: T, index: number) => boolean

type CallBackFilterAsync<T> = (value: T, index: number) => Promise<boolean>

type CallbackMap<T, U> = (value: T, index: number, collection: T[]) => U
type CallbackMapAsync<T, U> = (
	value: T,
	index: number,
	collection: T[],
) => Promise<U>

export type Secuence<T> = {
	map<U>(callback: CallbackMap<T, U>): Secuence<U>
	filter(callback: CallBackFilter<T>): Secuence<T>
	take(count: number): T[]
	takeFirst(): T | undefined
	takeLast(): T | undefined
}

export type SecuenceAsync<T> = {
	map<U>(callback: CallbackMapAsync<T, U>): SecuenceAsync<U>
	filter(callback: CallBackFilterAsync<T>): SecuenceAsync<T>
	take(count: number): Promise<T[]>
	takeFirst(): Promise<T | undefined>
	takeLast(): Promise<T | undefined>
}

export const secuence = <T>(
	arr: any[],
	operators: {
		kind: 'MAP' | 'FILTER'
		callback: (...ar: any[]) => any
	}[] = [],
): Secuence<T> => {
	const applyOperators = (element: any, index: number) => {
		let currentValue = element
		let isSelectable = true
		for (const operation of operators) {
			if (operation.kind === 'MAP')
				currentValue = operation.callback(element, index)
			if (operation.kind === 'FILTER') {
				const isCorrect = operation.callback(currentValue, index)
				if (!isCorrect) {
					isSelectable = false
					break
				}
			}
		}
		return [currentValue, isSelectable]
	}
	return {
		map<U>(callback: CallbackMap<T, U>) {
			return secuence<U>(arr as any[], [
				...operators,
				{
					kind: 'MAP',
					callback,
				},
			])
		},

		filter(callback: CallBackFilter<T>) {
			return secuence<T>(arr as any[], [
				...operators,
				{
					kind: 'FILTER',
					callback,
				},
			])
		},

		takeFirst(): T | undefined {
			for (const [index, element] of arr.entries()) {
				const [currentValue, isSelectable] = applyOperators(
					element,
					index,
				)
				if (isSelectable) return currentValue
			}
			return undefined
		},

		take(count: number): T[] {
			const elements: any[] = []
			for (const [index, element] of arr.entries()) {
				const [currentValue, isSelectable] = applyOperators(
					element,
					index,
				)
				if (isSelectable) {
					elements.push(currentValue)
				}
				if (elements.length === count) return elements
			}
			return elements
		},

		takeLast(): T | undefined {
			for (const [index, element] of arr.reverse().entries()) {
				const [currentValue, isSelectable] = applyOperators(
					element,
					index,
				)
				if (isSelectable) return currentValue
			}
			return undefined
		},
	}
}

export const secuenceAsync = <T>(
	arr: any[],
	operators: {
		kind: 'MAP' | 'FILTER'
		callback: (...ar: any[]) => Promise<any>
	}[] = [],
): SecuenceAsync<T> => {
	const applyOperators = async (element: any, index: number) => {
		let currentValue = element
		let isSelectable = true
		for (const operation of operators) {
			if (operation.kind === 'MAP')
				currentValue = await operation.callback(element, index)
			if (operation.kind === 'FILTER') {
				const isCorrect = await operation.callback(currentValue, index)
				if (!isCorrect) {
					isSelectable = false
					break
				}
			}
		}
		return [currentValue, isSelectable]
	}
	return {
		map<U>(callback: CallbackMapAsync<T, U>) {
			return secuenceAsync<U>(arr as any[], [
				...operators,
				{
					kind: 'MAP',
					callback,
				},
			])
		},

		filter(callback: CallBackFilterAsync<T>) {
			return secuenceAsync<T>(arr as any[], [
				...operators,
				{
					kind: 'FILTER',
					callback,
				},
			])
		},

		async takeFirst(): Promise<T | undefined> {
			for (const [index, element] of arr.entries()) {
				const [currentValue, isSelectable] = await applyOperators(
					element,
					index,
				)
				if (isSelectable) return currentValue
			}
			return undefined
		},

		async take(count: number): Promise<T[]> {
			const elements: any[] = []
			for (const [index, element] of arr.entries()) {
				const [currentValue, isSelectable] = await applyOperators(
					element,
					index,
				)
				if (isSelectable) {
					elements.push(currentValue)
				}
				if (elements.length === count) return elements
			}
			return elements
		},

		async takeLast(): Promise<T | undefined> {
			for (const [index, element] of arr.reverse().entries()) {
				const [currentValue, isSelectable] = await applyOperators(
					element,
					index,
				)
				if (isSelectable) return currentValue
			}
			return undefined
		},
	}
}
