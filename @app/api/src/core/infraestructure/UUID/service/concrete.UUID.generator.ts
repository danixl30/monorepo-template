import { Injectable } from '@nestjs/common'
import { v4 as UUID } from 'uuid'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'

@Injectable()
export class ConcreteUUIDGenerator implements UUIDGenerator {
    generate(): string {
        return UUID()
    }
}
