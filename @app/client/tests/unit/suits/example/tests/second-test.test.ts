import { expect } from '../../../core/impl'

export const name = 'second test'
export const body = () => {
    expect(2 + 2).equals(4)
}
