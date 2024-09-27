import { ServiceModule } from '../../decorators/service.module'
import { ConcreteUUIDGenerator } from '../service/concrete.UUID.generator'

export const UUID_GEN_NATIVE = 'UUID_GEN_NATIVE'

@ServiceModule([
	{
		provide: UUID_GEN_NATIVE,
		useClass: ConcreteUUIDGenerator,
	},
])
export class UUIDModule {}
