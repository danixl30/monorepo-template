import { Result } from '../../result-handler/result.handler'
import { AuditingDto } from '../dto/dto'

export interface AuditingRepository {
	saveAudit(data: AuditingDto): Promise<Result<string>>
}
