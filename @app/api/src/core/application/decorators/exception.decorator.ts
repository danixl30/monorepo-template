import { ApplicationService } from '../service/application.service'

export const exceptionDecorator =
	<T, U>(
		service: ApplicationService<T, U>,
		reductor: (e: Error) => void,
	): ApplicationService<T, U> =>
	async (data) => {
		try {
			return service(data)
		} catch (e) {
			reductor(e)
			throw e
		}
	}
