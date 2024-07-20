import { DataToTest } from './global.type'

export const name = 'The counter increase $number and add $data to name'
export const body = (
    data: DataToTest,
    input: {
        number: number
        data: string
    },
) => {
    data.count += input.number
    data.name += input.data
    return {
        count: data.count,
        name: data.name,
    }
}
