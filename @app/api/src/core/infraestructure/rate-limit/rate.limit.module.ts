import { ThrottlerModule } from '@nestjs/throttler'
import { ConfigurationModule } from '../decorators/config.module.decorator'

@ConfigurationModule([
	ThrottlerModule.forRoot({
        throttlers: [{
            ttl: 60,
            limit: 10,
        }]
	}),
])
export class RateLimitModule {}
