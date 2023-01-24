import { ControllersModule } from '../controllers/controllers.module'
import { DatabaseConnectionModule } from '../database/database.connection.module'
import { EnvModule } from '../env/env.module'
import { EventHandlerModule } from '../event-handler/event.handler.module'
import { EventListenerModule } from '../event-listener/event.listener.module'
import { GatewayModule } from '../gateway/gateway.module'
import { Module } from '@nestjs/common'
import { RateLimitModule } from '../rate-limit/rate.limit.module'

@Module({
    imports: [
        EnvModule,
        RateLimitModule,
        DatabaseConnectionModule,
        ControllersModule,
        EventHandlerModule,
        EventListenerModule,
        GatewayModule,
    ],
})
export class AppModule {}
