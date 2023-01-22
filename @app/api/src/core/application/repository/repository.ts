import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { ValueObject } from 'src/core/domain/value-objects/value.object'

export interface Repository<
    I extends ValueObject<I>,
    T extends AggregateRoot<I>,
> {
    save(aggregate: T): Promise<T>
    delete(aggregate: T): Promise<T>
}
