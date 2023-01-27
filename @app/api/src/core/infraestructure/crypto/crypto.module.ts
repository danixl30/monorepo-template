import { Module } from '@nestjs/common'
import { Sha256Module } from './sha256/sha256.module'

@Module({
    imports: [Sha256Module],
    exports: [Sha256Module],
})
export class CryptoModule {}
