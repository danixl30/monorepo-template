import { Module } from '@nestjs/common'
import { EventHandlerNativeModule } from './native/module/event.handler.native.module'

@Module({
    imports: [EventHandlerNativeModule],
})
export class EventHandlerModule {}
