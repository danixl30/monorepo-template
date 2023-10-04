import { DeleteImageOptions } from './types/delete.options'
import { ImageSaved } from './types/saved'
import { SaveImageOptions } from './types/save.options'
import { Result } from '../../result-handler/result.handler'
import { ApplicationError } from '../../error/application.error'

export interface ImageStorage {
    save(
        options: SaveImageOptions,
    ): Promise<Result<ImageSaved, ApplicationError>>
    delete(
        options: DeleteImageOptions,
    ): Promise<Result<ImageSaved, ApplicationError>>
}
