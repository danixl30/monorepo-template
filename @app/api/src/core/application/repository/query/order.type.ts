import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { OrderTypes } from './order.types'

export class OrderType implements ValueObject<OrderType> {
	constructor(private orderType: OrderTypes) {}

	get value() {
		return this.orderType
	}

	equals(other: OrderType): boolean {
		return other.value === this.value
	}
}
