export type ApplicationError = {
    name: string
    message: string
    kind: 'Application'
}

export const createApplicationError = (
    name: string,
    message: string,
): ApplicationError => ({
    name,
    message,
    kind: 'Application',
})
