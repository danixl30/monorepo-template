import { DataToTest } from './global.type'

export const name = 'The result is $number after increase and name is $name'
export const body = (
	data: DataToTest,
	input: {
		number: number
		name: string
	},
) => {
	console.log(data)
	lookFor(data.count).equals(input.number)
	lookFor(data.name).equals(input.name)
}
