import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const SocketId = createParamDecorator(
    (_: unknown, context: ExecutionContext) => {
        const client = context.switchToWs().getClient()
        return client.id
    },
)
