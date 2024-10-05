import { _Entity } from '../entity/entity'
import { DomainEventBase } from '../events/event'
import { ValueObject } from '../value-objects/value.object'

export abstract class AggregateRoot<
	T extends ValueObject<T>,
> extends _Entity<T> {
	private events: DomainEventBase[] = []

	pullEvents(): DomainEventBase[] {
		const temp = this.events
		this.events = []
		return temp
	}

	protected publish(event: DomainEventBase) {
		this.validateState()
		this.events.push(event)
	}

	protected hydratate(...events: DomainEventBase[]) {
		events.forEach((event) => {
			this[`on:${event.eventName}`](event)
			this.validateState()
		})
	}

	protected apply(...events: DomainEventBase[]) {
		events.forEach((event) => {
			this[`on:${event.eventName}`](event)
			this.validateState()
			events.push(event)
		})
	}

	abstract validateState(): void
}
