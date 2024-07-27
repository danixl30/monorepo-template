import { ConfigurationModule } from '../decorators/config.module.decorator'
import { loadDependencies } from '../modules/dependencies.loader'

@ConfigurationModule(await loadDependencies())
export class DatabaseConnectionModule {}
