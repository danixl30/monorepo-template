export const name = 'second test'
export const body = () => {
	console.log(new Date('2024-01-01') >= new Date('2025-01-01'))
	const arr = [1, 2, 3]
	const result = arr
		.asSecuence()
		.filter((e) => e % 2 === 0)
		.map((e) => e * 3)
		.takeFirst()
	lookFor(result).equals(6)
	arr.asSecuence()
		.filter((e) => e % 2 === 0)
		.map((e) => e * 3)
		.takeFirst()
	lookFor({
		a: '',
	}).toMathObject({
		a: '',
	})
	lookFor(2 + 2).equals(4)
}
