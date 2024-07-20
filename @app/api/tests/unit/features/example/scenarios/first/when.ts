import { DataToTest } from './global.type'

export const name = 'The counter increase $number'
export const body = (
    data: DataToTest,
    input: {
        number: number
    },
) => {
    data.count += input.number
    return data
}
