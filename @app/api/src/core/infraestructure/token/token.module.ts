import { Module } from '@nestjs/common'
import { JwtProviderModule } from './jwt/module/jwt.provider.module'

@Module({
    imports: [JwtProviderModule],
    exports: [JwtProviderModule],
})
export class TokenModule {}
