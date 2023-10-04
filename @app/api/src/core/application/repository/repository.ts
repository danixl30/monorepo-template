import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { ApplicationError } from '../error/application.error'
import { Result } from '../result-handler/result.handler'
import { ValueObject } from 'src/core/domain/value-objects/value.object'

export interface Repository<
    I extends ValueObject<I>,
    T extends AggregateRoot<I>,
> {
    save(aggregate: T): Promise<Result<boolean, ApplicationError>>
    delete(aggregate: T): Promise<Result<boolean, ApplicationError>>
    getById(id: I): Promise<Result<T, ApplicationError>>
}
