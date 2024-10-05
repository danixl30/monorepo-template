import { DomainEventBase } from 'src/core/domain/events/event'
import { Unsubscribe } from './subscription'

export interface EventHandler {
	publish(events: DomainEventBase[]): void
	subscribe(
		name: string,
		callback: (event: DomainEventBase) => Promise<void>,
	): Unsubscribe
}

export interface EventPublisher {
	publish(events: DomainEventBase[]): void
}

export interface EventListener {
	subscribe<T extends DomainEventBase>(
		name: T,
		callback: (event: T) => Promise<void>,
	): Unsubscribe
}
