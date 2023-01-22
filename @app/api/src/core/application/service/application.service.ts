export interface ApplicationService<T, U> {
    execute(data: T): Promise<U>
}
