import { DeleteImageOptions } from './types/delete.options'
import { ImageSaved } from './types/saved'
import { SaveImageOptions } from './types/save.options'

export interface ImageStorage {
    save(options: SaveImageOptions): Promise<ImageSaved>
    delete(options: DeleteImageOptions): Promise<ImageSaved>
}
