import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtProviderService } from '../service/jwt.provider.service'

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
