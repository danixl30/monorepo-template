import { EventHandlerNativeModule } from './native/module/event.handler.native.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [EventHandlerNativeModule],
})
export class EventHandlerModule {}
