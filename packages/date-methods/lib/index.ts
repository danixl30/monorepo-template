declare global {
	interface Date {
		/**
		 *
		 * Compare if two dates are equals
		 */
		equals(other?: Date): boolean
		/**
		 *
		 * Compera if date is less than other date
		 */
		lessThan(other?: Date): boolean
		/**
		 *
		 * Compare if date is less or equals than other date
		 */
		lessEqualsThan(other?: Date): boolean
	}

	interface DateConstructor {
		/**
		 *
		 * Check's if something is a date
		 */
		isDate(d: any): d is Date
	}
}

Date.prototype.equals = function (this: Date, other) {
	return other?.getTime() === this.getTime()
}

Date.prototype.lessThan = function (this: Date, other) {
	return this.getTime() < (other?.getTime() ?? 0)
}

Date.prototype.lessEqualsThan = function (this: Date, other) {
	return this.equals(other) || this.lessThan(other)
}

Date.isDate = function (d): d is Date {
	return d instanceof Date
}

export {}
