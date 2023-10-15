import { loader, suitDeclare } from '../../core/impl'

suitDeclare('example', {
    tests: await loader(__dirname),
})
