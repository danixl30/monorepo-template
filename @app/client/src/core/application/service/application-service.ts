export type ApplicationService<T, U> = (data: T) => Promise<U>
