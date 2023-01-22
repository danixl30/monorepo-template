import { jsonToString } from '@mono/object-utils'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const OnPublish = createParamDecorator(
    (_: unknown, context: ExecutionContext) => {
        const response = context.switchToHttp().getResponse()
        return (data: object) => {
            const text = jsonToString(data)
            response.write(text)
        }
    },
)
