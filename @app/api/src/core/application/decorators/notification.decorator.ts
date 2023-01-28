import { ApplicationError } from '../error/application.error'
import { ApplicationService } from '../service/application.service'
import { NotificationHandler } from '../notifications/handler/notification.handler'
import { Result } from '../result-handler/result.handler'
import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class NotificationDecorator<
    T,
    U,
    E extends ApplicationError,
    D extends object,
    V extends ValueObject<V>,
> implements ApplicationService<T, U, E>
{
    constructor(
        private service: ApplicationService<T, U, E>,
        private notificationHandler: NotificationHandler<D, V>,
        private data: {
            to: V
            data: D
        },
    ) {}

    async execute(data: T): Promise<Result<U, E>> {
        const result = await this.service.execute(data)
        this.notificationHandler.publish(this.data.to, this.data.data)
        return result
    }
}
