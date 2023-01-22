import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenProvider } from 'src/core/application/token/token.provider'

class JwtServiceManager<T extends object> implements TokenProvider<T> {
    constructor(private jwtService: JwtService) {}
    sign(value: T): string {
        return this.jwtService.sign(value)
    }

    verify(value: string): T {
        return this.jwtService.verify<T>(value)
    }
}

@Injectable()
export class JwtProviderService {
    constructor(private jwtService: JwtService) {}

    create<T extends object>() {
        return new JwtServiceManager<T>(this.jwtService)
    }
}
