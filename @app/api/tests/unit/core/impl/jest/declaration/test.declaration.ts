import { SuitDeclaration } from 'tests/unit/core/contracts/test.declaration'

export const jestSuitDeclartion: SuitDeclaration = (name: string, data) => {
    if (data.options?.skip) {
        describe.skip(name, () => {
            data.tests.map((e) => test(e.name, e.body))
        })
        return
    }
    if (data.options?.only) {
        describe.only(name, () => {
            data.tests.map((e) => test(e.name, e.body))
        })
        return
    }
    describe(name, () => {
        if (data.afterAll) data.afterAll.map((after) => afterAll(after))
        if (data.afterEach) data.afterEach.map((after) => afterEach(after))
        if (data.beforeEach) data.beforeEach.map((before) => beforeEach(before))
        if (data.beforeAll) data.beforeAll.map((before) => beforeAll(before))
        data.tests.map((e) => {
            if (e.options?.skip) return test.skip(e.name, e.body)
            if (e.options?.only) return test.only(e.name, e.body)
            return test(e.name, e.body)
        })
    })
}
