import { Result } from '../../result-handler/result.handler'
import { DeleteImageOptions } from './types/delete.options'
import { SaveImageOptions } from './types/save.options'
import { ImageSaved } from './types/saved'

export interface ImageStorage {
	save(options: SaveImageOptions): Promise<Result<ImageSaved>>
	delete(options: DeleteImageOptions): Promise<Result<ImageSaved>>
}
