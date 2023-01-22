import { Module, Global } from '@nestjs/common'
import { EventHandlerNative } from '../service/event.hadler.native.service'

@Global()
@Module({
    providers: [EventHandlerNative],
    exports: [EventHandlerNative],
})
export class EventHandlerNativeModule {}
