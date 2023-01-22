import { Module } from '@nestjs/common'
import { ConcreteUUIDGenerator } from '../service/concrete.UUID.generator'

@Module({
    providers: [ConcreteUUIDGenerator],
    exports: [ConcreteUUIDGenerator],
})
export class UUIDModule {}
