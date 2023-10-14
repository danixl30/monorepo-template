import { ApplicationService } from '../service/application.service'
import { Result } from '../result-handler/result.handler'
import { createApplicationError } from '../error/application.error'

export class DomainErrorParserDecorator<T, U>
    implements ApplicationService<T, U>
{
    constructor(private service: ApplicationService<T, U>) {}
    async execute(data: T): Promise<Result<U>> {
        try {
            return await this.service.execute(data)
        } catch (error) {
            if (error.kind === 'Domain')
                return Result.error(
                    createApplicationError(error.name, error.message),
                )
            throw error
        }
    }
}
