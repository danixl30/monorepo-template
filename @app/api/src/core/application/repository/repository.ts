import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { Result } from '../result-handler/result.handler'
import { ValueObject } from 'src/core/domain/value-objects/value.object'

export interface Repository<
    I extends ValueObject<I>,
    T extends AggregateRoot<I>,
> {
    save(aggregate: T): Promise<Result<boolean>>
    delete(aggregate: T): Promise<Result<boolean>>
    getById(id: I): Promise<Result<T>>
}
