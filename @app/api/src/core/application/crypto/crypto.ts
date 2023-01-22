export interface Crypto {
    encrypt(value: string): string
    compare(normal: string, encrypted: string): boolean
}
