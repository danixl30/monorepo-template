export type SuitDeclaration = (
    name: string,
    data: {
        tests: TestDeclaration[]
        options?: {
            skip?: boolean
            only?: boolean
        }
        beforeEach?: (() => void)[]
        beforeAll?: (() => void)[]
        afterAll?: (() => void)[]
        afterEach?: (() => void)[]
    },
) => void

export type TestDeclaration = {
    name: string
    body(): void
    options?: {
        skip?: boolean
        only?: boolean
    }
}
