export type Either<L, R> = {
	get left(): L
	get right(): R
	isLeft(): boolean
	isRight(): boolean
}

export const Left = <L, R>(left: L): Either<L, R> => ({
	get left() {
		return left
	},
	get right(): any {
		throw new Error('Is left')
	},
	isRight() {
		return false
	},
	isLeft() {
		return true
	},
})

export const Right = <L, R>(right: R): Either<L, R> => ({
	get left(): any {
		throw new Error('Is right')
	},
	get right() {
		return right
	},
	isRight() {
		return true
	},
	isLeft() {
		return false
	},
})
