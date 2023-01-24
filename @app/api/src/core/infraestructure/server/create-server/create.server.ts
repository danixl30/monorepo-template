import { NestFactory } from '@nestjs/core'

export const createServer = async (module: any) => NestFactory.create(module)
