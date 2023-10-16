import { expect } from '../../../core/impl'
import { useAxiosHttp } from 'src/core/infraestructure/http/axios/useAxiosHttpHandler'

export const name = 'firstTest'
export const body = () => {
    expect(Boolean(useAxiosHttp('').get)).equals(true)
}
