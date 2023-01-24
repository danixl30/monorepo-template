import { DomainEvent } from 'src/core/domain/events/event'
import { Subscription } from './subscription'

export interface EventHandler {
    publish(events: DomainEvent[]): void
    subscribe(
        name: string,
        callback: (event: DomainEvent) => Promise<void>,
    ): Subscription
}
