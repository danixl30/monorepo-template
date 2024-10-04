import { ApplicationService } from '../service/application.service'

export const exceptionDecorator =
	<T, U>(
		service: ApplicationService<T, U>,
		reductor: (e: Error) => void,
	): ApplicationService<T, U> =>
	async (data) => {
		const [error, res] = await service(data).destructurePromise()
		if (error) {
			reductor(error)
			throw error
		}
		return res!
	}
