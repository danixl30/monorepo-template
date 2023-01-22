import { Subscription } from './subscription'
import { DomainEvent } from 'src/core/domain/events/event'

export interface EventHandler {
    publish(events: DomainEvent[]): void
    subscribe(
        name: string,
        callback: (event: DomainEvent) => Promise<void>,
    ): Subscription
}
