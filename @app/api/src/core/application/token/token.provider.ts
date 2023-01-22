export interface TokenProvider<T extends object> {
    sign(value: T): string
    verify(value: string): T
}
