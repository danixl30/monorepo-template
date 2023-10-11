export type Dictionary<T> = {
    [key: string]: T
}

export type TypeClass<T> = {
    new (): T
}

export type Optional<T> = T | undefined | null

export type ArgumentTypes<F extends Function> = F extends (
    ...args: infer A
) => any
    ? A
    : never

export type ReturnType<F extends Function> = F extends (
    ...args: any[]
) => infer R
    ? R
    : never

export type PickMatching<T, V> = {
    [K in keyof T as T[K] extends V ? K : never]: T[K]
}

export type ExtractMethods<T> = PickMatching<T, Function>
