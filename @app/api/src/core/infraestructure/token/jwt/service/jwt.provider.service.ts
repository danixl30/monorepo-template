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
	async sign(value: T): Promise<Result<string>> {
		const token = this.jwtService.sign(value)
		return Ok(token)
	}

	async verify(value: string): Promise<Result<T>> {
		const [error, data] = await Promise.try(() =>
			this.jwtService.verify<T>(value),
		).destructurePromise()
		if (error || !data) return Fail(invalidTokenError())
		return Ok(data)
	}
}

@Injectable()
export class JwtProviderService {
	constructor(private jwtService: JwtService) {}

	create<T extends object>() {
		return new JwtServiceManager<T>(this.jwtService)
	}
}
