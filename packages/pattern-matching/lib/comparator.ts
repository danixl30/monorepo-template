export const isEqual = (a: any, b: any): boolean => {
    if (a === b) return true
    if (a instanceof Date && b instanceof Date)
        return a.getTime() === b.getTime()
    if (b.__kind && typeof b === 'function') return b(a)
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
        return a === b
    if (a === null || a === undefined || b === null || b === undefined)
        return false
    const keys = Object.keys(b)
    return keys.every((k) => isEqual(a[k], b[k]))
}
