import { TypeClass } from '@mono/types-utils'
import { NestFactory } from '@nestjs/core'

export const createServer = async <T, U extends TypeClass<T>>(module: U) =>
	NestFactory.create(module)
