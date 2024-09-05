import { ApplicationError } from '../error/application.error'
import { ResultHandler } from './types/result.callbacks'

export type Result<T> = {
	unwrap(): T
	unwrapOr(defaultValue: T): T
	isError(): boolean
	handleError<R>(handler: (e: ApplicationError<any>) => R): R
	match<R, RE>(handler: ResultHandler<T, R, RE>): RE | R
	convertToOther<T>(): Result<T>
}

export const Success = <T>(value: T): Result<T> => ({
	unwrap() {
		return value
	},
	unwrapOr() {
		return value
	},
	convertToOther() {
		throw new Error('This result is not an error')
	},
	match(handler) {
		return handler.success(value)
	},
	handleError() {
		throw new Error('Can not handler without an error')
	},
	isError() {
		return false
	},
})

export const Failure = <T>(err: ApplicationError): Result<T> => ({
	unwrap() {
		throw err
	},
	unwrapOr(defaultValue) {
		return defaultValue
	},
	convertToOther<T>() {
		return Failure<T>(err)
	},
	match(handler) {
		return handler.error(err)
	},
	handleError(handler) {
		return handler(err)
	},
	isError() {
		return true
	},
})
