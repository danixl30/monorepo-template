import { ExceptionReductor } from '../exception-reductor/exception.reductor'
import { ApplicationService } from '../service/application.service'

export class ExceptionDecorator<T, U> implements ApplicationService<T, U> {
    constructor(
        private service: ApplicationService<T, U>,
        private reductor: ExceptionReductor,
    ) {}
    async execute(data: T): Promise<U> {
        try {
            return this.service.execute(data)
        } catch (e) {
            this.reductor.reduce(e)
            throw e
        }
    }
}
