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
    ? Partial<A>
    : never
