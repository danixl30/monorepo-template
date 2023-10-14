import { glob } from 'glob'
import { join } from 'node:path'
import { objectValues } from '@mono/object-utils'

export const initializeRepositories = (folder: string) => {
    const repositoriesPart = glob.sync(
        join(
            __dirname,
            `../../../../**/infraestructure/repositories/${folder}/**/index.js`,
        ).replace(/\\/g, '/'),
    )
    const repositoriesUni = glob.sync(
        join(
            __dirname,
            `../../../../**/infraestructure/repositories/${folder}/*.repository.js`,
        ).replace(/\\/g, '/'),
    )
    return [...repositoriesUni, ...repositoriesPart].map((e) => {
        const module = require(e)
        return objectValues(module)[0]
    })
}
