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

declare global {
    interface Array<T> {
        asyncForEach<U>(
            callback: (e: T, i: number, arr: T[]) => Promise<U>,
        ): Promise<void>
        asyncMap<U>(
            callback: (e: T, i: number, arr: T[]) => Promise<U>,
        ): Promise<U[]>
        asyncFilter(callback: CallBackFilter<T>): Promise<T[]>
        asyncFilterWithComplement(
            callback: CallBackFilter<T>,
        ): Promise<[T[], T[]]>
        filterWithComplement(callback: CallBackFilterSync<T>): [T[], T[]]
        asyncFind(callback: CallBackFind<T>): Promise<T | undefined>
        asyncFindIndex(callback: CallBackFindIndex<T>): Promise<number>
        asyncSome(callback: CallBackSome<T>): Promise<boolean>
        asyncEvery(callback: CallBackEvery<T>): Promise<boolean>
        asyncReduce<U>(
            callback: CallBackReduce<T, U>,
            initialState?: U,
        ): Promise<U>
        asyncReduceRight<U>(
            callback: CallBackReduceRight<T, U>,
            initialState?: U,
        ): Promise<U>
        asyncFindMap<U>(
            callback: CallBackFindMapAsync<T, U>,
        ): Promise<U | undefined>
        findMap<U>(callback: CallBackFindMap<T, U>): U | undefined
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

export default null
