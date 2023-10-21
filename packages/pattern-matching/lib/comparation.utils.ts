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
}
