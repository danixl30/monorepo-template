import { Injectable } from '@nestjs/common'
import { IDGenerator } from 'src/core/application/ID/ID.generator'

@Injectable()
export class ConcreteUUIDGenerator {
	generate(): IDGenerator<string> {
		return () => crypto.randomUUID()
	}
}
