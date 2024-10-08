import { ServiceModule } from '../../decorators/service.module'
import { Sha256Service } from './service/sha256.service'

export const SHA256_CRYPTO = 'SHA256_CRYPTO'

@ServiceModule([
	{
		provide: SHA256_CRYPTO,
		useClass: Sha256Service,
	},
])
export class Sha256Module {}
