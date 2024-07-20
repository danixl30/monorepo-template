import { ApplicationService } from '../service/application.service'
import { Result } from '../result-handler/result.handler'
import { makeApplicationErrorFactory } from '../error/application.error'

export const domainErrorParser =
	<T, U>(service: ApplicationService<T, U>): ApplicationService<T, U> =>
	async (data) => {
		try {
			return await service(data)
		} catch (error) {
			if (error.kind === 'DOMAIN')
				return Result.error(
					makeApplicationErrorFactory({
						name: error.name,
						message: error.message,
					})(error.info),
				)
			throw error
		}
	}
