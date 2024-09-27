import { makeApplicationErrorFactory } from '../error/application.error'
import { Fail } from '../result-handler/result.handler'
import { ApplicationService } from '../service/application.service'

export const domainErrorParser =
	<T, U>(service: ApplicationService<T, U>): ApplicationService<T, U> =>
	async (data) => {
		try {
			return await service(data)
		} catch (error) {
			if (error.kind === 'DOMAIN')
				return Fail(
					makeApplicationErrorFactory({
						name: error.name,
						message: error.message,
					})(error.info),
				)
			throw error
		}
	}
