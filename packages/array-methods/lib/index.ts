import { isEqual } from './comparator'
import { secuence, secuenceAsync } from './sequence'

type CallBackFilter<T> = (
	value: T,
	index: number,
	collection: T[],
) => Promise<boolean>

type CallBackFilterSync<T> = (
	value: T,
	index: number,
	collection: T[],
) => boolean

type CallBackFind<T> = (
	value: T,
	index: number,
	collection: T[],
) => Promise<boolean>

type CallBackFindIndex<T> = (
	value: T,
	index: number,
	collection: T[],
) => Promise<boolean>

type CallBackReduce<T, R> = (
	accumulator: R,
	value: T,
	index: number,
	collection: T[],
) => Promise<R>

type CallBackReduceRight<T, R> = (
	accumulator: T | R,
	value: T,
	index: number,
	collection: T[],
) => Promise<T | R>

type CallBackSome<T> = (
	value: T,
	index: number,
	collection: T[],
) => Promise<boolean>

type CallBackEvery<T> = (
	value: T,
	index: number,
	collection: T[],
) => Promise<boolean>

type CallBackFindMapAsync<T, R> = (
	value: T,
	index: number,
	collection: T[],
) => Promise<R | undefined>

type CallBackFindMap<T, R> = (
	value: T,
	index: number,
	collection: T[],
) => R | undefined

type CallBackCount<T> = (value: T, index: number, collection: T[]) => boolean

type CallBackCountAsync<T> = (
	value: T,
	index: number,
	collection: T[],
) => Promise<boolean>

type NumberOrNever<T> = T extends number ? number : never

type Resolver<T> = (item: T) => any

type Indexer<T> = number | keyof T | symbol

type ValueResolver<T> = Indexer<T> | Resolver<T>

declare global {
	interface Array<T> {
		/**
		 *
		 * Foreach with promise callback
		 */
		asyncForEach<U>(
			callback: (e: T, i: number, arr: T[]) => Promise<U>,
		): Promise<void>
		/**
		 *
		 * Map mith promise callback (similar to Promise.all)
		 */
		asyncMap<U>(
			callback: (e: T, i: number, arr: T[]) => Promise<U>,
		): Promise<U[]>
		/**
		 *
		 * Filter with promise callback
		 */
		asyncFilter(callback: CallBackFilter<T>): Promise<T[]>
		/**
		 *
		 * Filter with complement with promise callback
		 */
		asyncFilterWithComplement(
			callback: CallBackFilter<T>,
		): Promise<[T[], T[]]>
		/**
		 *
		 * Similar to filter but returns the elements that not be filtered
		 * Example: [1, 2, 3, 4] -> (e) => e % 2 === 0
		 * Returns: [[2, 4], [1, 3]]
		 */
		filterWithComplement(callback: CallBackFilterSync<T>): [T[], T[]]
		/**
		 *
		 * Find with promise callback
		 */
		asyncFind(callback: CallBackFind<T>): Promise<T | undefined>
		/**
		 *
		 * FindIndex with promise callback
		 */
		asyncFindIndex(callback: CallBackFindIndex<T>): Promise<number>
		/**
		 *
		 * Some with promise callback
		 */
		asyncSome(callback: CallBackSome<T>): Promise<boolean>
		/**
		 *
		 * Every with promise callback
		 */
		asyncEvery(callback: CallBackEvery<T>): Promise<boolean>
		/**
		 *
		 * Reduce with promise callback
		 *
		 */
		asyncReduce<U>(
			callback: CallBackReduce<T, U>,
			initialState?: U,
		): Promise<U>
		/**
		 *
		 * ReduceRight with promise callback
		 *
		 */
		asyncReduceRight<U>(
			callback: CallBackReduceRight<T, U>,
			initialState?: U,
		): Promise<U>
		/**
		 *
		 * FindMap with promise callback
		 */
		asyncFindMap<U>(
			callback: CallBackFindMapAsync<T, U>,
		): Promise<U | undefined>
		/**
		 *
		 * Is a combination with find and map where if the return of the callback is undefined it's going to apply the callback until the return is not undefined and return the element
		 * Example: [1, 2, 3, 4] -> (e) => e % 2 === 0 ? e * 3 : undefined
		 * Returns: 6
		 */
		findMap<U>(callback: CallBackFindMap<T, U>): U | undefined
		/**
		 * Check if array is empty
		 */
		isEmpty(): boolean
		/**
		 * Check if array is not empty
		 */
		isNotEmpty(): boolean
		/**
		 * Returns the last index of the array
		 */
		get lastIndex(): number
		/**
		 * Returns the last element of the array
		 */
		get last(): T
		/**
		 *
		 * Binary search by a callback, returns the element and index
		 */
		binarySearch(compare: (a: T) => number): [T, number] | undefined
		/**
		 *
		 * Binary search with async callback
		 */
		asyncBinarySearch(
			compare: (a: T) => Promise<number>,
		): Promise<[T, number] | undefined>
		groupBy(callback: (ele: T, index: number) => string | number): {
			[key: string | number]: T[]
		}
		/**
		 * Clean the array
		 */
		clean(): T[]
		/**
		 * Returns an array with the indexes
		 */
		indexes(): number[]
		/**
		 *
		 * Count elements by a callback
		 */
		count(callback: CallBackCount<T>): number
		/**
		 *
		 * Count with promise callback
		 */
		asyncCount(callback: CallBackCountAsync<T>): Promise<number>
		/**
		 * Kotlin's Sequence API
		 */
		asSecuence(): ReturnType<typeof secuence<T>>
		/**
		 * Kotlin's Sequence API with promise managment
		 */
		asSecuenceAsync(): ReturnType<typeof secuenceAsync<T>>
		uniqueBy(valueResolver?: ValueResolver<T>): T[]
		subArray(from: number, to?: number): T[]
		/**
		 *
		 * Compare two arrays with deep equal
		 */
		equals(other?: T[]): boolean
		with(index: number, element: T): T[]
		toReversed(): T[]
		toSorted(callback: (a: T, b: T) => number): T[]
		toSpliced(start: number, elementCount?: number, ...items: T[]): T[]
	}

	interface Array<T extends number | string> {
		/**
		 * Calculate average of number array
		 */
		average(): NumberOrNever<T>
		/**
		 * Get max element onf number array
		 */
		max(): NumberOrNever<T>
		/**
		 * Get min element onf number array
		 */
		min(): NumberOrNever<T>
		/**
		 * Sum all elements of number array
		 */
		sum(): NumberOrNever<T>
	}

	interface ArrayConstructor {
		range(start: number, end: number, stepBy?: number): number[]
	}
}

if (typeof Array.prototype.uniqueBy !== 'function')
	Object.defineProperty(Array.prototype, 'uniqueBy', {
		writable: true,
		configurable: true,
		value: function <T>(this: T[], valueResolver?: ValueResolver<T>) {
			if (!(valueResolver != null)) return [...new Set(this)]

			const key = typeof valueResolver !== 'function' && valueResolver,
				map = new Map<any, T>()

			valueResolver = key
				? (item: Record<Indexer<T>, any>) => item?.[key] ?? item
				: valueResolver

			for (const item of this) {
				const key = (valueResolver as Resolver<T>)(item)

				if (!map.has(key)) map.set(key, item)
			}

			return [...map.values()]
		},
	})

if (!Array.prototype.groupBy)
	Array.prototype.groupBy = function (
		this: any[],
		callback: (e: any, i: number) => string | number,
	) {
		return this.reduce((acc, e, index) => {
			const key = callback(e, index)
			if (!acc[key]) acc[key] = []
			acc[key].push(e)
			return acc
		}, {})
	}

if (!Array.prototype.equals)
	Array.prototype.equals = function (this: any[], other?: any[]) {
		return isEqual(this, other)
	}

if (!Array.prototype.average)
	Array.prototype.average = function (this: number[]) {
		return this.reduce((acc, e) => acc + e, 0) / this.length
	}

if (!Array.prototype.sum)
	Array.prototype.sum = function (this: number[]) {
		return this.reduce((acc, e) => acc + e, 0)
	}

if (!Array.prototype.max)
	Array.prototype.max = function (this: number[]) {
		return Math.max(...this)
	}

if (!Array.prototype.min)
	Array.prototype.min = function (this: number[]) {
		return Math.min(...this)
	}

if (!Array.prototype.lastIndex)
	Object.defineProperty(Array.prototype, 'lastIndex', {
		get(this: any[]) {
			return this.length - 1
		},
	})

if (!Array.prototype.last)
	Object.defineProperty(Array.prototype, 'last', {
		get(this: any[]) {
			return this.at(-1)
		},
	})

if (!Array.prototype.binarySearch)
	Array.prototype.binarySearch = function (this: any[], compare) {
		let left = 0,
			right = this.lastIndex
		while (left <= right) {
			const mid = Math.floor((left + right) / 2)
			const compareResult = compare(this[mid])
			if (compareResult === 0) return [this[mid], mid]
			if (compareResult < 0) right = mid - 1
			left = mid + 1
		}
		return undefined
	}

if (!Array.prototype.asyncBinarySearch)
	Array.prototype.asyncBinarySearch = async function (this: any[], compare) {
		let left = 0,
			right = this.lastIndex
		while (left <= right) {
			const mid = Math.floor((left + right) / 2)
			const compareResult = await compare(this[mid])
			if (compareResult === 0) return [this[mid], mid]
			if (compareResult < 0) right = mid - 1
			left = mid + 1
		}
		return undefined
	}

Array.prototype.asyncForEach = async function (callback) {
	await Promise.all(this.map(callback))
}

Array.prototype.asyncMap = async function (callback) {
	return Promise.all(this.map(callback))
}

Array.prototype.asyncFilter = async function (cb) {
	const filteredResults: any[] = []
	for (const [index, element] of this.entries()) {
		if (await cb(element, index, this)) {
			filteredResults.push(element)
		}
	}
	return filteredResults
}

Array.prototype.asyncFind = async function (cb) {
	for (const [index, element] of this.entries()) {
		if (await cb(element, index, this)) {
			return element
		}
	}
	return undefined
}

Array.prototype.asyncFindMap = async function (cb) {
	for (const [index, element] of this.entries()) {
		const res = await cb(element, index, this)
		if (res !== undefined && res !== null) {
			return res
		}
	}
	return undefined
}

Array.prototype.findMap = function (cb) {
	for (const [index, element] of this.entries()) {
		const res = cb(element, index, this)
		if (res !== undefined && res !== null) {
			return res
		}
	}
	return undefined
}

Array.prototype.asyncEvery = async function (cb) {
	for (const [index, element] of this.entries()) {
		if (!(await cb(element, index, this))) {
			return false
		}
	}
	return true
}

Array.prototype.asyncFindIndex = async function aFindIndex(cb) {
	for (const [index, element] of this.entries()) {
		if (await cb(element, index, this)) {
			return index
		}
	}
	return -1
}

Array.prototype.asyncSome = async function (cb) {
	for (const [index, element] of this.entries()) {
		if (await cb(element, index, this)) {
			return true
		}
	}
	return false
}

Array.prototype.asyncReduce = async function (cb, initialValue) {
	let reducedValue: any
	let index = 0

	if (initialValue === undefined) {
		reducedValue = this[0]
		index++
	} else {
		reducedValue = initialValue
	}

	for (; index < this.length; index++) {
		reducedValue = await cb(reducedValue, this[index], index, this)
	}

	return reducedValue
}

Array.prototype.asyncReduceRight = async function (cb, initialValue) {
	let reducedValue: any
	let index = this.length - 1

	if (initialValue === undefined) {
		reducedValue = this[0]
		index--
	} else {
		reducedValue = initialValue
	}

	for (; index >= 0; index--) {
		reducedValue = await cb(reducedValue, this[index], index, this)
	}

	return reducedValue
}

Array.prototype.isNotEmpty = function (): boolean {
	return this.length !== 0
}

Array.prototype.isEmpty = function (): boolean {
	return this.length === 0
}

if (!Array.prototype.with)
	Array.prototype.with = function (index: number, element) {
		if (index < 0 || index > this.length) throw new Error('Invalid index')
		return this.map((e, i) => (i !== index ? e : element))
	}

if (!Array.prototype.toReversed)
	Array.prototype.toReversed = function () {
		return [...this].reverse()
	}

if (!Array.prototype.toSorted)
	Array.prototype.toSorted = function (callback) {
		return [...this].sort(callback)
	}

if (!Array.prototype.toSpliced)
	Array.prototype.toSpliced = function (
		start: number,
		elementCount: number,
		...items: any[]
	) {
		const newArr = [...this]
		newArr.splice(start, elementCount, ...items)
		return newArr
	}

Array.prototype.filterWithComplement = function (callback) {
	const arrSet: any[] = []
	const complement: any[] = []
	for (const [index, element] of this.entries()) {
		if (callback(element, index, this)) {
			arrSet.push(element)
		} else {
			complement.push(element)
		}
	}
	return [arrSet, complement]
}

Array.prototype.asyncFilterWithComplement = async function (callback) {
	const arrSet: any[] = []
	const complement: any[] = []
	for (const [index, element] of this.entries()) {
		if (await callback(element, index, this)) {
			arrSet.push(element)
		} else {
			complement.push(element)
		}
	}
	return [arrSet, complement]
}

Array.prototype.clean = function (this: any[]) {
	this.length = 0
	return this
}

Array.prototype.indexes = function (this: any[]) {
	return Array.from(this.keys())
}

Array.range = function (start, end, stepBy = 1) {
	const arr: number[] = []
	for (; start <= end; start += stepBy) arr.push(start)
	return arr
}

Array.prototype.count = function (this: any[], callback) {
	return this.filter(callback).length
}

Array.prototype.asyncCount = async function (this: any[], callback) {
	const arr = await Promise.all(this.map(callback))
	return arr.filter((e) => e).length
}

Array.prototype.asSecuence = function (this: any[]) {
	return secuence(this)
}

Array.prototype.asSecuenceAsync = function (this: any[]) {
	return secuenceAsync(this)
}

Array.prototype.subArray = function (this: any[], from, to) {
	return this.slice(from, to)
}

export default null
