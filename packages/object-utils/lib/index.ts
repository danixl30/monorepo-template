export const objectKeys = <T extends object>(obj: T): string[] =>
	Object.keys(obj)

export const objectAppend = <T extends object, U extends object>(
	obj: T,
	...values: U[]
): T => Object.assign(obj, ...values)

export const objectValues = <T extends object>(obj: T) => Object.values(obj)

export const jsonParse = <T extends object>(data: string): T => JSON.parse(data)

export const jsonToString = <T extends object>(obj: T): string =>
	JSON.stringify(obj)

export const cloneObject = <T extends object>(obj: T): T => structuredClone(obj)

export const cloneObjectManualy = <T extends object>(object: T): T => {
	if (object instanceof Date) return new Date(object) as T
	const copy = Array.isArray(object) ? [] : {}
	Object.keys(object).forEach((e) => {
		if (typeof object[e] === 'object') {
			copy[e] = cloneObjectManualy(object[e])
			return
		}
		copy[e] = object[e]
	})
	return copy as T
}

type PublicSetters<T> = {
	[K in keyof T]?: T[K] extends (...args: any[]) => any ? never : T[K]
}

export const isEqual = (a: any, b: any): boolean => {
	if (typeof a === 'function' && typeof b === 'function') return true
	if (a === b) return true
	if (a instanceof Date && b instanceof Date)
		return a.getTime() === b.getTime()
	if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
		return a === b
	if (a === null || a === undefined || b === null || b === undefined)
		return false
	const keys = Object.keys(b)
	if (Object.keys(a).length !== keys.length) return false
	return keys.every((k) => isEqual(a[k], b[k]))
}

declare global {
	type InternalRecord<T = Record<any, any>> = Readonly<
		T & {
			/**
			 *
			 * Compare if two records are equals
			 */
			equals(other?: InternalRecord): boolean
		}
	>
	interface ObjectConstructor {
		groupBy<T>(
			arr: T[],
			callback: (ele: T, index: number) => string | number,
		): { [key: string | number]: T[] }
		assignPropeties<T extends object>(
			target: T,
			values: PublicSetters<T>,
		): void
	}
	interface Object {
		/**
		 * Create a copy of the object only with the state, you can compare two different instances and will check their states if are equals and you can get the string as JSON
		 */
		asRecord<
			T extends Record<any, any> = Record<any, any>,
		>(): InternalRecord<T>
	}
}

const transformArray = (arr: any[]): any[] =>
	arr
		.filter((e) => typeof e !== 'function' && e !== undefined)
		.map((e) => {
			if (e instanceof Date) return new Date(e)
			if (e === null) return null
			if (Array.isArray(e)) return transformArray
			if (typeof e === 'object') return e.asRecord()
			return e
		})

Object.prototype.asRecord = function (this: object): any {
	if (Array.isArray(this)) {
		const newData = transformArray(this)
		newData.toString = function () {
			return JSON.stringify(this)
		}
		;(newData as unknown as any).equals = function (other) {
			return isEqual(other, this)
		}
		return Object.freeze(newData)
	}
	const data = Object.keys(this).reduce((acc, e) => {
		if (typeof this[e] === 'function' || this[e] === undefined) return acc
		if (this[e] instanceof Date)
			return {
				...acc,
				[e]: new Date(this[e]),
			}
		if (this[e] === null)
			return {
				...acc,
				[e]: null,
			}
		if (Array.isArray(this[e])) {
			return {
				...acc,
				[e]: transformArray(this[e]),
			}
		}
		if (typeof this[e] === 'object') {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { equals: _, toString: _s, ...rest } = this[e].asRecord()
			return {
				...acc,
				[e]: {
					...rest,
				},
			}
		}
		return {
			...acc,
			[e]: this[e],
		}
	}, {})
	const record = {
		...data,
		equals(other) {
			if (!other) return false
			return isEqual(this, other)
		},
		toString() {
			return JSON.stringify(this)
		},
	} satisfies InternalRecord<any>
	return Object.freeze(record)
}

if (!Object.groupBy)
	Object.groupBy = function (
		arr: any[],
		callback: (e: any, i: number) => string | number,
	) {
		return arr.reduce((acc, e, index) => {
			const key = callback(e, index)
			if (acc[key]) acc.key.push(e)
			else acc[key] = [e]
			return acc
		}, {})
	}

Object.assignPropeties = function (target: object, values: object) {
	Object.keys(target).forEach((e) => (target[e] = values[e]))
}
