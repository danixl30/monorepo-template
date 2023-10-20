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

const notComp = (target: ComparationUtil): any => {
    const notLogic: ComparationUtil = (data: any) => !target(data)
    notLogic.__kind = 'Not'
    return notLogic
}

const optionalComp = (target: ComparationUtil): any => {
    const optionalLogic: ComparationUtil = (data: any) => !data || target(data)
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
}
