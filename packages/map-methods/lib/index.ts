type SafeRecordProp<T, U> = T extends PropertyKey ? Record<T, U> : never

declare global {
	interface Map<K, V> {
		/**
		 * Get Map keys as array
		 */
		get keysArr(): K[]
		/**
		 * Get Map values as array
		 */
		get valuesArr(): V[]
		/**
		 * Convert Map to JSON if the keys are valid
		 */
		toJSON(): SafeRecordProp<K, V>
	}
	interface MapConstructor {
		/**
		 * Build the Map by a JSON
		 */
		fromJSON<T extends PropertyKey, U>(record: Record<T, U>): Map<T, U>
	}
}

Map.fromJSON = function <T extends PropertyKey, U>(record: Record<T, U>) {
	return new Map<T, U>(Object.keys(record).map((e) => [e as T, record[e]]))
}

Object.defineProperty(Map.prototype, 'keysArr', {
	get: function () {
		return [...this.keys()]
	},
})

Object.defineProperty(Map.prototype, 'valuesArr', {
	get: function () {
		return [...this.values()]
	},
})

Map.prototype.toJSON = function (this: Map<any, any>) {
	return [...this.entries()].reduce((acc, e) => {
		if (
			typeof e[0] !== 'number' &&
			typeof e[0] !== 'string' &&
			typeof e[0] !== 'symbol'
		)
			throw new Error('Unvalid key ' + e)
		acc[e[0]] = e[1]
		return acc
	}, {})
}

export {}
