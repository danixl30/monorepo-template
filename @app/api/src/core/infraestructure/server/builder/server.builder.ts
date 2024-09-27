import { TypeClass } from '@mono/types-utils'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Builder } from 'src/utils/builder/builder'
import { createServer } from '../create-server/create.server'
import { DocumentationProps } from './types/documentation.props'

export class ServerBuilder implements Builder<INestApplication> {
	private constructor(private app: INestApplication) {}

	setGlobalProfix(prefix: string) {
		this.app.setGlobalPrefix(prefix)
		return this
	}

	setCors(allowDomains: string[] = []) {
		if (!allowDomains || allowDomains.isEmpty()) {
			this.app.enableCors()
			return this
		}
		this.app.enableCors({ origin: allowDomains })
		return this
	}

	setValidationPipe() {
		this.app.useGlobalPipes(
			new ValidationPipe({
				transform: true,
			}),
		)
		return this
	}

	setDocumentation(props: DocumentationProps) {
		const configBuilder = new DocumentBuilder()
			.setTitle(props.title)
			.setDescription(props.description)
			.setVersion(props.version)
		if (props.bearerAuth) configBuilder.addBearerAuth()
		const config = configBuilder.build()
		const document = SwaggerModule.createDocument(this.app, config)
		SwaggerModule.setup(props.path, this.app, document)
		return this
	}

	build(): INestApplication {
		return this.app
	}

	static async create<T, U extends TypeClass<T>>(appModule: U) {
		if (!(appModule as any).__isAppModule)
			throw new Error('Invalid application module')
		const app = await createServer(appModule)
		return new ServerBuilder(app)
	}
}
