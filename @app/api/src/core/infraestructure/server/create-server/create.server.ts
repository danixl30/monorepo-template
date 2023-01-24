import { NestFactory } from '@nestjs/core'

export const createServer = async <T>(module: T) => NestFactory.create(module)
