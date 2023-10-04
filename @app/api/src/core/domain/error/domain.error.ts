export type DomainError = {
    name: string
    message: string
    kind: 'Domain'
}

export const createDomainError = (
    name: string,
    message: string,
): DomainError => ({
    name,
    message,
    kind: 'Domain',
})
