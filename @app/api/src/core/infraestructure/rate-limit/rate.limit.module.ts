import { Module } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
    ],
})
export class RateLimitModule {}
