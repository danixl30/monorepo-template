export type SuitDeclaration = (
    name: string,
    data: {
        tests: TestDeclaration[]
        options?: {
            skip?: boolean
            only?: boolean
        }
        beforeEach?: (() => void | Promise<void>)[]
        beforeAll?: (() => void | Promise<void>)[]
        afterAll?: (() => void | Promise<void>)[]
        afterEach?: (() => void | Promise<void>)[]
    },
) => void

export type TestDeclaration = {
    name: string
    body(): void | Promise<void>
    options?: {
        skip?: boolean
        only?: boolean
    }
}
