import { SubType } from './matcher'
import { isEqual } from './comparator'

type ComparationUtil = {
    (data: any): boolean
    __kind: string
}

const anyComp: ComparationUtil = () => true
anyComp.__kind = 'any'

const stringComp: ComparationUtil = (data: any) => typeof data === 'string'
stringComp.__kind = 'string'

const numberComp: ComparationUtil = (data: any) => typeof data === 'number'
numberComp.__kind = 'number'

const booleanComp: ComparationUtil = (data: any) => typeof data === 'boolean'
booleanComp.__kind = 'boolean'

const bigintComp: ComparationUtil = (data: any) => typeof data === 'bigint'
bigintComp.__kind = 'bigint'

const notComp = <T>(target: SubType<T> | ComparationUtil): any => {
    const notLogic: ComparationUtil = (data: any) => isEqual(data, target)
    notLogic.__kind = 'Not'
    return notLogic
}

const andComp = <T>(...target: (SubType<T> | ComparationUtil)[]): any => {
    const andLogic: ComparationUtil = (data: any) =>
        target.every((target) => isEqual(data, target))
    andLogic.__kind = 'And'
    return andLogic
}

const orComp = <T>(...target: (SubType<T> | ComparationUtil)[]): any => {
    const orLogic: ComparationUtil = (data: any) =>
        target.some((target) => isEqual(data, target))
    orLogic.__kind = 'Or'
    return orLogic
}

const optionalComp = <T>(target?: SubType<T> | ComparationUtil): any => {
    const optionalLogic: ComparationUtil = (data: any) =>
        data === null || data === undefined || isEqual(data, target)
    optionalLogic.__kind = 'Not'
    return optionalLogic
}

const whenComp = <T>(callback: (input: T) => boolean): any => {
    const whenLogic: ComparationUtil = (data: any) => callback(data)
    whenLogic.__kind = 'When'
    return whenLogic
}

const instanceOfComp = (target: new (...args: any) => any): any => {
    const instanceOfLogic: ComparationUtil = (data: any) =>
        data instanceof target
    instanceOfLogic.__kind = 'InstanceOf'
    return instanceOfLogic
}

const arrFiller = (data: any) => {
    const obj = {
        data,
        __kind: 'ArrFiller',
    }
    return [obj]
}

const arrayComp = <T>(...args: (ComparationUtil | SubType<T>)[]): any => {
    const arrayLogic: ComparationUtil = (data: any) => {
        if (!Array.isArray(data)) return false
        if (Array.isArray(data) && args.length === 0) return true
        if (args.length === 1) {
            const arr = new Array<any>(data.length).fill(args[0])
            return isEqual(data, arr)
        }
        const arrFillIndex = args.findIndex(
            (e) => (e as any).__kind === 'ArrFiller',
        )
        const newArr = args.splice(
            arrFillIndex,
            1,
            ...new Array(data.length - args.length - 1).fill(
                (args[arrFillIndex] as any).data,
            ),
        )
        return isEqual(data, newArr)
    }
    arrayLogic.__kind = 'Array'
    return arrayLogic
}

const setComp = (comp: ComparationUtil): any => {
    const setLogic: ComparationUtil = (data: any) => {
        if (!(data instanceof Set)) return false
        const values = Array.from(data)
        const verifiers = new Array(values.length).fill(comp)
        return isEqual(values, verifiers)
    }
    setLogic.__kind = 'Set'
    return setLogic
}

const mapComp = (key: ComparationUtil, value: ComparationUtil): any => {
    const mapLogic: ComparationUtil = (data: any) => {
        if (!(data instanceof Map)) return false
        const values = Array.from(data)
        const verifiers = new Array(values.length).fill([key, value])
        return isEqual(values, verifiers)
    }
    mapLogic.__kind = 'Map'
    return mapLogic
}

export const ComparationUtils = {
    Any: anyComp as any,
    String: stringComp as any,
    Number: numberComp as any,
    Boolean: booleanComp as any,
    BigInt: bigintComp as any,
    Not: notComp,
    Optional: optionalComp,
    When: whenComp,
    And: andComp,
    Or: orComp,
    InstanceOf: instanceOfComp,
    Array: arrayComp,
    ArrayFiller: arrFiller,
    Set: setComp,
    Map: mapComp,
}
