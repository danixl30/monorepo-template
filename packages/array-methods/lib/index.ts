declare global {
    interface Array<T> {
        asyncForEach<U>(
            callback: (e: T, i: number, arr: T[]) => Promise<U>,
        ): Promise<void>
        asyncMap<U>(
            callback: (e: T, i: number, arr: T[]) => Promise<U>,
        ): Promise<U[]>
        isEmpty(): boolean
        isNotEmpty(): boolean
        with(index: number, element: T): T[]
        toReversed(): T[]
        toSorted(callback: (a: T, b: T) => number): T[]
        toSpliced(start: number, elementCount: number, ...items: T[]): T[]
    }
}

Array.prototype.asyncForEach = async function (callback) {
    await Promise.all(this.map(callback))
}

Array.prototype.asyncMap = async function (callback) {
    return await Promise.all(this.map(callback))
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

export default null
