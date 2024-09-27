import { isNotNull } from '../../../utils/null-manager/null-checker'
import { AuditingDto } from '../auditing/dto/dto'
import { AuditingRepository } from '../auditing/repository/audit.repository'
import { ApplicationService } from '../service/application.service'

export const auditDecorator =
	<T, R>(
		service: ApplicationService<T, R>,
		auditter: AuditingRepository,
		dto: AuditingDto,
	): ApplicationService<T, R> =>
	async (data) => {
		const result = await service(data)
		dto.ocurredOn = new Date()
		dto.succes = !result.isError()
		if (result.isError()) {
			auditter.saveAudit(dto)
		}
		if (!result.isError() && isNotNull(result.unwrap())) {
			auditter.saveAudit(dto)
		}
		return result
	}
