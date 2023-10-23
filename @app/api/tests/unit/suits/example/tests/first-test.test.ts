import { expect } from '../../../core/impl'
import { match } from '@mono/pattern-matching'
import { ComparationUtils as C } from '@mono/pattern-matching'

export const name = 'firstTest'
export const body = () => {
    match({
        a: [1, '', '', '', 1],
        b: 1,
    })
        // .with(
        //     {
        //         a: C.String,
        //     },
        //     () => console.log('test matched'),
        // )
        .with(
            {
                a: [1, ...C.ArrayFiller(C.String), 1],
                b: C.Number,
            },
            () => console.log('arr'),
        )
        .otherwise(() => console.log('default1'))
    expect(true).equals(true)
}
