type CallBackFilter<T> = (
	value: T,
	index: number,
	collection: T[],
) => Promise<boolean> | boolean

type CallBackMap<T, U> = (
	value: T,
	index: number,
	collection: T[],
) => Promise<U> | U

type CallBackEach<T> = (
	value: T,
	index: number,
	collection: T[],
) => Promise<any> | any

type UnwrapArray<T> = T extends (infer U)[] ? U : never

type CallBackFindMapAsync<T, R> = (
	value: T,
	index: number,
	collection: T[],
) => Promise<R | undefined> | R | undefined

type CallBackReduce<T, R> = (
	accumulator: R,
	value: T,
	index: number,
	collection: T[],
) => Promise<R> | R

type CallBackFind<T> = (
	value: T,
	index: number,
	collection: T[],
) => Promise<boolean> | boolean

type ArrayOrNever<T, U> = T extends any[] ? U : never

declare global {
	interface Promise<T> {
		/**
		 *
		 * If promise contains an array you can apply filter derectly
		 */
		filter(
			callback: CallBackFilter<UnwrapArray<T>>,
		): ArrayOrNever<T, Promise<T>>
		/**
		 *
		 * If promise contains an array you can apply some derectly
		 */
		some(
			callback: CallBackFilter<UnwrapArray<T>>,
		): ArrayOrNever<T, Promise<boolean>>
		/**
		 *
		 * If promise contains an array you can apply every derectly
		 */
		every(
			callback: CallBackFilter<UnwrapArray<T>>,
		): ArrayOrNever<T, Promise<boolean>>
		/**
		 *
		 * If promise contains an array you can apply foreach derectly
		 */
		each(
			callback: CallBackEach<UnwrapArray<T>>,
		): ArrayOrNever<T, Promise<void>>
		/**
		 *
		 * If promise contains an array you can apply map derectly
		 */
		map<U>(
			callback: CallBackMap<UnwrapArray<T>, U>,
		): ArrayOrNever<T, Promise<U[]>>
		/**
		 *
		 * If promise contains an array you can apply filterWithComplement derectly
		 */
		filterWithComplement(
			callback: CallBackFilter<UnwrapArray<T>>,
		): ArrayOrNever<T, Promise<[T, T]>>
		/**
		 *
		 * If promise contains an array you can apply findMap derectly
		 */
		findMap<U>(
			callback: CallBackFindMapAsync<UnwrapArray<T>, U>,
		): ArrayOrNever<T, Promise<U | undefined>>
		/**
		 *
		 * If promise contains an array you can apply reduce derectly
		 */
		reduce<U>(
			callback: CallBackReduce<UnwrapArray<T>, U>,
			initialState?: U,
		): ArrayOrNever<T, Promise<U>>
		/**
		 *
		 * If promise contains an array you can apply find derectly
		 */
		find(
			callback: CallBackFind<UnwrapArray<T>>,
		): ArrayOrNever<T, Promise<UnwrapArray<T> | undefined>>
		/**
		 *
		 * If promise contains an array you can apply count derectly
		 */
		count(callback: CallBackFilter<UnwrapArray<T>>): Promise<number>
		/**
		 *
		 * Destructure promise to extract error and data [error, data]
		 */
		destructurePromise<E = any>(): Promise<
			[error: E, undefined] | [undefined, data: T]
		>
	}
	interface PromiseConstructor {
		withResolvers<T>(): {
			promise: Promise<T>
			resolve: (data: T) => any
			reject: (err: any) => any
		}
		parallel<T extends Record<any, any>>(
			values: T,
		): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>
		/**
		 *
		 * Resolve promises sequentialy
		 */
		sequence<T extends Record<any, any>>(
			values: T,
		): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>
		try<T>(fn: () => T | Promise<T>): Promise<T>
		/**
		 *
		 * Checks if something is a promise
		 */
		isPromise<T>(v: any): v is Promise<T>
	}
}

if (!Promise.prototype.map)
	Promise.prototype.map = async function (this: Promise<any[]>, callback) {
		const arr = await this
		return Promise.all(arr.map(callback))
	}

if (!Promise.prototype.filter)
	Promise.prototype.filter = async function (this: Promise<any[]>, callback) {
		const arr = await this
		const filteredResults: any[] = []
		for (const [index, element] of arr.entries()) {
			if (await callback(element, index, arr)) {
				filteredResults.push(element)
			}
		}
		return filteredResults
	}

if (!Promise.prototype.find)
	Promise.prototype.find = async function (this: Promise<any[]>, callback) {
		const arr = await this
		for (const [index, element] of arr.entries()) {
			if (await callback(element, index, arr)) {
				return element
			}
		}
		return undefined
	}

if (!Promise.prototype.reduce)
	Promise.prototype.reduce = async function (
		this: Promise<any[]>,
		callback,
		initialValue,
	) {
		const arr = await this
		let reducedValue: any
		let index = 0

		if (initialValue === undefined) {
			reducedValue = this[0]
			index++
		} else {
			reducedValue = initialValue
		}

		for (; index < arr.length; index++) {
			reducedValue = await callback(reducedValue, arr[index], index, arr)
		}

		return reducedValue
	}

if (!Promise.prototype.filterWithComplement)
	Promise.prototype.filterWithComplement = async function (
		this: Promise<any[]>,
		callback,
	) {
		const arr = await this
		const arrSet: any[] = []
		const complement: any[] = []
		for (const [index, element] of arr.entries()) {
			if (await callback(element, index, arr)) {
				arrSet.push(element)
			} else {
				complement.push(element)
			}
		}
		return [arrSet, complement]
	}

if (!Promise.prototype.findMap)
	Promise.prototype.findMap = async function (
		this: Promise<any[]>,
		callback,
	) {
		const arr = await this
		for (const [index, element] of arr.entries()) {
			const res = await callback(element, index, arr)
			if (res !== undefined && res !== null) {
				return res
			}
		}
		return undefined
	}

if (!Promise.prototype.each)
	Promise.prototype.each = async function (this: Promise<any[]>, callback) {
		const arr = await this
		Promise.all(arr.map(callback))
	}

if (!Promise.prototype.some)
	Promise.prototype.some = async function (this: Promise<any[]>, callback) {
		const arr = await this
		for (const [index, element] of arr.entries()) {
			if (await callback(element, index, arr)) {
				return true
			}
		}
		return false
	}

if (!Promise.prototype.every)
	Promise.prototype.every = async function (this: Promise<any[]>, callback) {
		const arr = await this
		for (const [index, element] of arr.entries()) {
			if (!(await callback(element, index, arr))) {
				return false
			}
		}
		return true
	}

if (!Promise.withResolvers)
	Promise.withResolvers = function <T>() {
		let resolve: (data: T) => any = () => {},
			reject: (err: any) => any = () => {}
		const promise = new Promise<T>((res, rej) => {
			resolve = res
			reject = rej
		})
		return {
			promise,
			resolve,
			reject,
		}
	}

if (!Promise.parallel)
	Promise.parallel = async function (values) {
		if (Array.isArray(values)) return Promise.all(values)
		const results = await Promise.all(Object.values(values))
		return Object.keys(values).reduce(
			(acc, e, i) => ({
				...acc,
				[e]: results[i],
			}),
			{},
		) as any
	}

if (!Promise.sequence)
	Promise.sequence = async function (values) {
		const isArray = Array.isArray(values)
		const res: any = isArray ? [] : {}
		for (const index in values) {
			if (typeof values[index]['then'] === 'function')
				res[isArray ? Number(index) : index] = await values[index]
			res[isArray ? Number(index) : index] = values[index]
		}
		return res
	}

Promise.prototype.count = async function (this: Promise<any[]>, callback) {
	const arr = await this
	const filteredResults: any[] = []
	for (const [index, element] of arr.entries()) {
		if (await callback(element, index, arr)) {
			filteredResults.push(element)
		}
	}
	return filteredResults.length
}

if (!Promise.try)
	Promise.try = async function (fn) {
		return fn()
	}

if (!Promise.isPromise)
	Promise.isPromise = <T>(v: any): v is Promise<T> => v instanceof Promise

Promise.prototype.destructurePromise = async function (this: Promise<any>) {
	try {
		const data = await this
		return [undefined, data]
	} catch (e) {
		return [e, undefined]
	}
}

export default null
