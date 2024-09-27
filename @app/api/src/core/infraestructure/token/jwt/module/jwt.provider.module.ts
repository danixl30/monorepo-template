import { JwtModule } from '@nestjs/jwt'
import { ServiceModule } from 'src/core/infraestructure/decorators/service.module'
import { JwtProviderService } from '../service/jwt.provider.service'

export const JWT_PROVIDER_TOKEN = 'JWT_PROVIDER_TOKEN'

@ServiceModule(
	[
		{
			provide: JWT_PROVIDER_TOKEN,
			useClass: JwtProviderService,
		},
	],
	[
		JwtModule.register({
			secret: 'test',
		}),
	],
)
export class JwtProviderModule {}
