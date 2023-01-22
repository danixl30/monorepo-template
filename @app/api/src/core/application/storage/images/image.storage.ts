import { DeleteImageOptions } from './types/delete.options'
import { SaveImageOptions } from './types/save.options'
import { ImageSaved } from './types/saved'

export interface ImageStorage {
    save(options: SaveImageOptions): Promise<ImageSaved>
    delete(options: DeleteImageOptions): Promise<ImageSaved>
}
