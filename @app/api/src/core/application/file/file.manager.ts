import { Result } from '../result-handler/result.handler'
import { DeleteFileOptions } from './types/delete.options'

export interface FileManager {
	delete(options: DeleteFileOptions): Promise<Result<boolean>>
}
