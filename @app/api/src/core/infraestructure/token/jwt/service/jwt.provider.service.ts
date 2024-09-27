import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
	Fail,
	Ok,
	Result,
} from 'src/core/application/result-handler/result.handler'
import { TokenProvider } from 'src/core/application/token/token.provider'
import { invalidTokenError } from './errors/invalid.token'

class JwtServiceManager<T extends object> implements TokenProvider<T> {
	constructor(private jwtService: JwtService) {}
	sign(value: T): Result<string> {
		const token = this.jwtService.sign(value)
		return Ok(token)
	}

	verify(value: string): Result<T> {
		try {
			const data = this.jwtService.verify<T>(value)
			return Ok(data)
		} catch (_error) {
			return Fail(invalidTokenError())
		}
	}
}

@Injectable()
export class JwtProviderService {
	constructor(private jwtService: JwtService) {}

	create<T extends object>() {
		return new JwtServiceManager<T>(this.jwtService)
	}
}
