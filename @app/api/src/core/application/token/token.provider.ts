import { Result } from '../result-handler/result.handler'

export interface TokenProvider<T extends object> {
	sign(value: T): Promise<Result<string>>
	verify(value: string): Promise<Result<T>>
}
