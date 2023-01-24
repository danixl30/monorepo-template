import { DomainEvent } from 'src/core/domain/events/event'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Injectable } from '@nestjs/common'
import { Subscription } from 'src/core/application/event-handler/subscription'

@Injectable()
export class EventHandlerNative implements EventHandler {
    private subscribers: {
        [name: string]: ((e: DomainEvent) => Promise<void>)[]
    } = {}
    publish(events: DomainEvent[]): void {
        events.forEach((event) =>
            this.subscribers[event.constructor.name]?.forEach((sub) =>
                sub(event),
            ),
        )
    }

    subscribe(
        name: string,
        callback: (event: DomainEvent) => Promise<void>,
    ): Subscription {
        if (!this.subscribers[name]) this.subscribers[name] = []
        this.subscribers[name].push(callback)
        return {
            unsubscribe: () => {
                this.subscribers[name] = this.subscribers[name].filter(
                    (e) => e !== callback,
                )
            },
        }
    }
}
