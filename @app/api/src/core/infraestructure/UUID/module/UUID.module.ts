import { ConcreteUUIDGenerator } from '../service/concrete.UUID.generator'
import { Module } from '@nestjs/common'

@Module({
    providers: [ConcreteUUIDGenerator],
    exports: [ConcreteUUIDGenerator],
})
export class UUIDModule {}
