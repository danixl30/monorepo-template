import { DataToTest } from './global.type'

export const name = 'The result is $number after increase'
export const body = (
    data: DataToTest,
    input: {
        number: number
    },
) => {
    lookFor(data.count).equals(input.number)
}
