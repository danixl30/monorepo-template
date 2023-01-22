import { DeleteFileOptions } from './types/delete.options'

export interface FileManager {
    delete(options: DeleteFileOptions): Promise<void>
}
