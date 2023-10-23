export interface ControllerContract<T extends any[], U> {
    execute(...args: T): Promise<U>
}
