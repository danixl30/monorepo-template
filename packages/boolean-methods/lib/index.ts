declare global {
	interface Boolean {
		/**
		 * 
		 * Compare two instances of Boolean and returns true if constains the same value
		 */
		equals(other?: boolean): boolean
		/**
		 * Similar to valueOf
		 */
		toPrimitive(): boolean
	}
	interface BooleanConstructor {
		/**
		 * 
		 * Create boolean by s string, if you pass 'false' will return false, in other cases will use the original constructor
		 */
		fromString(str: string): boolean
		/**
		 * 
		 * Get boolean by array, compare the lenght
		 */
		fromArray(arr: any[]): boolean
		/**
		 * 
		 * Get boolean by object, compare the lenght of the keys
		 */
		fromObject(obj: Record<any, any>): boolean
	}
}

Boolean.prototype.toPrimitive = Boolean.prototype.valueOf

Boolean.prototype.equals = function (this: boolean, other) {
	return this.valueOf() === other?.valueOf()
}

Boolean.fromString = function (str) {
	if (str === 'false') return false
	return Boolean(str)
}

Boolean.fromArray = function (arr) {
	return arr.length > 0
}

Boolean.fromObject = function (obj) {
	return Object.keys(obj).length > 0
}

export default null
