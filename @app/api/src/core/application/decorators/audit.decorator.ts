import { ApplicationService } from '../service/application.service'
import { AuditingRepository } from '../auditing/repository/audit.repository'
import { isNotNull } from '../../../utils/null-manager/null-checker'
import { AuditingDto } from '../auditing/dto/dto'

export const auditDecorator =
	<T, R>(
		service: ApplicationService<T, R>,
		auditter: AuditingRepository,
		dto: AuditingDto,
	): ApplicationService<T, R> =>
	async (data) => {
		try {
			const result = await service(data)
			dto.ocurredOn = new Date(Date.now())
			dto.succes = !result.isError()
			if (result.isError()) {
				auditter.saveAudit(dto)
			}
			if (!result.isError() && isNotNull(result.unwrap())) {
				auditter.saveAudit(dto)
			}
			return result
		} catch (error) {
			throw error
		}
	}
