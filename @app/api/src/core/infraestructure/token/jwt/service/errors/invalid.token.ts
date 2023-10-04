import { createApplicationError } from 'src/core/application/error/application.error'

export const INVALID_TOKEN = 'INVALID_TOKEN'
export const invalidTokenError = createApplicationError(
    INVALID_TOKEN,
    'The token is not valid',
)
