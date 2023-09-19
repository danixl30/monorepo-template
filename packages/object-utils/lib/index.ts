export const objectKeys = <T extends object>(obj: T): string[] =>
    Object.keys(obj)

export const objectAppend = <T extends object, U extends object>(
    obj: T,
    ...values: U[]
): T => Object.assign(obj, ...values)

export const objectValues = <T extends object>(obj: T) => Object.values(obj)

export const jsonParse = <T extends object>(data: string): T => JSON.parse(data)

export const jsonToString = <T extends object>(obj: T): string =>
    JSON.stringify(obj)

export const cloneObject = <T extends object>(obj: T): T => structuredClone(obj)

declare global {
    interface ObjectConstructor {
        groupBy<T>(
            arr: T[],
            callback: (ele: T, index: number) => string | number,
        ): { [key: string | number]: T[] }
    }
}

if (!Object.groupBy)
    Object.groupBy = function (
        arr: any[],
        callback: (e: any, i: number) => string | number,
    ) {
        return arr.reduce((acc, e, index) => {
            const key = callback(e, index)
            if (acc[key]) acc.key.push(e)
            else acc[key] = [e]
            return acc
        }, {})
    }
