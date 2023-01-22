import { NestFactory } from '@nestjs/core'

export const createServer = async (module: any) =>
    await NestFactory.create(module)
