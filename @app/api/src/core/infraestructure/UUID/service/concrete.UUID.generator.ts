import { Injectable } from '@nestjs/common'
import { IDGenerator } from 'src/core/application/ID/ID.generator'
import { v4 as UUID } from 'uuid'

@Injectable()
export class ConcreteUUIDGenerator implements IDGenerator {
    generate(): string {
        return UUID()
    }
}
