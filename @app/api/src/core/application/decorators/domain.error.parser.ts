import { ApplicationService } from '../service/application.service'
import { makeApplicationErrorFactory } from '../error/application.error'
import { Failure } from '../result-handler/result.handler'

export const domainErrorParser =
	<T, U>(service: ApplicationService<T, U>): ApplicationService<T, U> =>
	async (data) => {
		try {
			return await service(data)
		} catch (error) {
			if (error.kind === 'DOMAIN')
				return Failure(
					makeApplicationErrorFactory({
						name: error.name,
						message: error.message,
					})(error.info),
				)
			throw error
		}
	}
