export interface ControllerContract<T, U> {
    execute(...args: T[]): Promise<U>
}
