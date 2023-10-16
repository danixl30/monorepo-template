import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { expect } from '../../../core/impl'

export const name = 'firstTest'
export const body = () => {
    console.log(new ConcreteUUIDGenerator().generate())
    expect(true).equals(true)
}
