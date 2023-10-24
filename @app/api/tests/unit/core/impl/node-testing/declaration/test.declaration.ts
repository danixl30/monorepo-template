import { SuitDeclaration } from '@mono/test-utils'
import { test } from 'node:test'

export const nodeTestSuitDeclartion: SuitDeclaration = (name: string, data) => {
    test(
        name,
        {
            ...data.options,
        },
        async (t) => {
            if (data.afterAll) data.afterAll.map((after) => t.after(after))
            if (data.afterEach)
                data.afterEach.map((after) => t.afterEach(after))
            if (data.beforeEach)
                data.beforeEach.map((before) => t.beforeEach(before))
            if (data.beforeAll) data.beforeAll.map((before) => t.before(before))
            await data.tests.asyncMap((e) => {
                return t.test(
                    e.name,
                    {
                        ...e.options,
                    },
                    e.body,
                )
            })
        },
    )
}
