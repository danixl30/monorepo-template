import { Injectable } from '@nestjs/common'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Unsubscribe } from 'src/core/application/event-handler/subscription'
import { DomainEventBase } from 'src/core/domain/events/event'

@Injectable()
export class EventHandlerNative implements EventHandler {
	#subscribers: {
		[name: string]: ((e: DomainEventBase) => Promise<void>)[]
	} = {}
	publish(events: DomainEventBase[]): void {
		events.forEach((event) =>
			this.#subscribers[event.eventName]?.forEach((sub) => sub(event)),
		)
	}

	subscribe(
		name: string,
		callback: (event: DomainEventBase) => Promise<void>,
	): Unsubscribe {
		if (!this.#subscribers[name]) this.#subscribers[name] = []
		this.#subscribers[name].push(callback)
		return () =>
			(this.#subscribers[name] = this.#subscribers[name].filter(
				(e) => e !== callback,
			))
	}
}
