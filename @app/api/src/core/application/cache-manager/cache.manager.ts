export interface CacheManager {
    get<T>(key: string): Promise<T>
    save<T>(key: string, data: T): Promise<void>
    delete(key: string): Promise<void>
}
