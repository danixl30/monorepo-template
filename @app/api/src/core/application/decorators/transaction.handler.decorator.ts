import { ApplicationService } from '../service/application.service'
import { TransactionHandler } from '../transaction/transaction.handler'

export const transactionHandler =
	<T, U>(
		service: ApplicationService<T, U>,
		transactionHandler: TransactionHandler,
	): ApplicationService<T, U> =>
	async (data) => {
		try {
			const result = await service(data)
			if (result.isError()) {
				await transactionHandler.cancel()
			} else {
				await transactionHandler.commit()
			}
			return result
		} catch (e) {
			await transactionHandler.cancel()
			throw e
		}
	}
