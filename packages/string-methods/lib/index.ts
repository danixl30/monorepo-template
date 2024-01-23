declare global {
    interface String {
        isEmpty(): boolean
        isNotEmpty(): boolean
        isInRage(lower: number, greater: number): boolean
        reverse(): string
    }
}

String.prototype.isEmpty = function (): boolean {
    return this.length === 0
}

String.prototype.isNotEmpty = function (): boolean {
    return this.length !== 0
}

String.prototype.isInRage = function (lower, greater) {
    return this.lenght >= lower && this.lenght <= greater
}

if (!String.prototype.reverse)
    String.prototype.reverse = function (this: string) {
        return this.split('').reverse().join('')
    }

declare global {
    interface StringConstructor {
        isString<T>(value: T): boolean
    }
}

String.isString = <T>(value: T): boolean => typeof value === 'string'

export default null
