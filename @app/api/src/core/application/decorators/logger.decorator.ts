import { isNotNull } from 'src/utils/null-manager/null-checker'
import { LoggerContract } from '../logger/logger.contract'
import { ApplicationService } from '../service/application.service'

export const loggerDecorator =
	<T, R>(
		service: ApplicationService<T, R>,
		logger: LoggerContract,
	): ApplicationService<T, R> =>
	async (data) => {
		try {
			logger.log('INPUT:', JSON.stringify(data))
			const result = await service(data)
			if (result.isError())
				logger.error(JSON.stringify(result.handleError((e) => e)))
			if (!result.isError() && isNotNull(result.unwrap()))
				logger.log('RESULT:', JSON.stringify(result.unwrap()))
			return result
		} catch (error) {
			logger.exception(JSON.stringify(error))
			throw error
		}
	}
