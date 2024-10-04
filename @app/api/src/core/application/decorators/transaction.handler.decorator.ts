import { ApplicationService } from '../service/application.service'
import { TransactionHandler } from '../transaction/transaction.handler'

export const transactionHandler =
	<T, U>(
		service: ApplicationService<T, U>,
		transactionHandler: TransactionHandler,
	): ApplicationService<T, U> =>
	async (data) => {
		const [error, result] = await service(data).destructurePromise()
		if (error) {
			await transactionHandler.cancel()
			throw error
		}
		if (result!.isError()) {
			await transactionHandler.cancel()
		} else {
			await transactionHandler.commit()
		}
		return result!
	}
