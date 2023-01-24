import { JwtModule } from '@nestjs/jwt'
import { JwtProviderService } from '../service/jwt.provider.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [
        JwtModule.register({
            secret: 'test',
        }),
    ],
    providers: [JwtProviderService],
    exports: [JwtProviderService],
})
export class JwtProviderModule {}
