export const isEqual = (a: any, b: any) => {
    if (a === b) return true
    if (a instanceof Date && b instanceof Date)
        return a.getTime() === b.getTime()
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
        return a === b
    if (a === null || a === undefined || b === null || b === undefined)
        return false
    if (b.__kind && typeof b === 'function') return b(a)
    const keys = Object.keys(b)
    return keys.every((k) => isEqual(a[k], b[k]))
}
