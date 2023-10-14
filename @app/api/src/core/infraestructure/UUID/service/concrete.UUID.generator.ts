import { IDGenerator } from 'src/core/application/ID/ID.generator'
import { Injectable } from '@nestjs/common'
import { v4 as UUID } from 'uuid'

@Injectable()
export class ConcreteUUIDGenerator implements IDGenerator<string> {
    generate(): string {
        return UUID()
    }
}
