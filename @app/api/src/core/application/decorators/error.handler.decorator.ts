import { ApplicationError } from '../error/application.error'
import { ApplicationService } from '../service/application.service'

export const errorDecorator =
	<T, U>(
		service: ApplicationService<T, U>,
		parser: (error: ApplicationError) => Error,
	): ApplicationService<T, U> =>
	async (data) => {
		const result = await service(data)
		if (result.isError()) throw result.handleError(parser)
		return result
	}
