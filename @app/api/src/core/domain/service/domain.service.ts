export interface DomainService<T, U> {
    execute(data: T): U
}
