export interface ValueObject<T extends ValueObject<T>> {
	equals(other?: T): boolean
}

export type ValueObjectPrimitive<T> = T & {
	equals(other?: ValueObjectPrimitive<T>): boolean
}

export type ValueObjectFactory<
	T extends ValueObjectPrimitive<any>,
	A extends any[],
> = (...args: A) => T
