import { ApplicationError } from '../error/application.error'
import { ApplicationService } from '../service/application.service'
import { Result } from '../result-handler/result.handler'

export class ErrorDecorator<T, U, E extends ApplicationError>
    implements ApplicationService<T, U, E>
{
    constructor(
        private service: ApplicationService<T, U, E>,
        private parser: (error: E) => Error,
    ) {}
    async execute(data: T): Promise<Result<U, E>> {
        const result = await this.service.execute(data)
        if (result.isError()) throw result.handleError(this.parser)
        return result
    }
}
