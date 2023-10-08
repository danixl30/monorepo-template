import { loader, suitDeclare } from '../../core/impl'

suitDeclare('example', {
    tests: loader(__dirname),
})
