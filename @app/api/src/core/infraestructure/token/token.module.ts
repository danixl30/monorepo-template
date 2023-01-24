import { JwtProviderModule } from './jwt/module/jwt.provider.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [JwtProviderModule],
    exports: [JwtProviderModule],
})
export class TokenModule {}
