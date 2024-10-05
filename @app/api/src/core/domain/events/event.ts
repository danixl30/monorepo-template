type EventBase = object

export type DomainEventBase = {
	eventName: string
	timestamp: Date
}

export type DomainEventInstance<T extends EventBase> = {
	readonly [Property in keyof T as Exclude<
		Property,
		'timestamp'
	>]: T[Property]
} & {
	readonly timestamp: Date
}

export function domainEventFactory<T extends EventBase>(eventName: string) {
	return (
		data: T & {
			timestamp?: Date
		},
	): DomainEventInstance<T & DomainEventBase> => ({
		eventName,
		timestamp: data.timestamp ?? new Date(),
		...data,
	})
}

export type UnwrapEventType<T extends (data: any) => DomainEventInstance<any>> =
	T extends (data: any) => infer U ? U : never
