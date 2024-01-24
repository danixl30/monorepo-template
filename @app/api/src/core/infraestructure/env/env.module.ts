import { ConfigModule } from '@nestjs/config'
import { ConfigurationModule } from '../decorators/config.module.decorator'

@ConfigurationModule([
    ConfigModule.forRoot({
        isGlobal: true,
    }),
])
export class EnvModule {}
