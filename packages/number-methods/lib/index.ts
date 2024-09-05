declare global {
	interface Number {
		/**
		 * Get the nearest int of number
		 */
		nextInt(): number
		/**
		 *
		 * To fixed but it returns in number
		 */
		toFixedNumber(digits?: number): number
		/**
		 *
		 * Compare if number is equals to other, if you compare two NaN it returns true
		 */
		// eslint-disable-next-line @typescript-eslint/ban-types
		equals(other?: number | Number): boolean
		/**
		 * Get the lenght of int part of a number
		 */
		lenghtInt(): number
		/**
		 * Get the lenght of decimal part of a number
		 */
		lenghtDecimal(): number
	}
}

Number.prototype.nextInt = function () {
	return Math.ceil(this)
}

Number.prototype.toFixedNumber = function (this: number, digits?: number) {
	return Number(this.toFixed(digits))
}

Number.prototype.equals = function (this: number, other?: number) {
	if (Number.isNaN(this) && Number.isNaN(other)) return true
	return Number(this) === Number(other)
}

Number.prototype.lenghtInt = function (this: number) {
	return this.toFixed(0).length
}

Number.prototype.lenghtDecimal = function (this: number) {
	if (!this.toString().includes('.')) return 0
	return this.toString().split('.').at(-1)!.length
}

export default null
