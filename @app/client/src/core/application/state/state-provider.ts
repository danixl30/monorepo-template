export type StateViewer<T> = {
    get value(): T
    getValue(): T
    subscribe(subs: (state: T) => void): void
}

export type StateProvider<T> = {
    state: StateViewer<T>
    setState(value: T): void
}
