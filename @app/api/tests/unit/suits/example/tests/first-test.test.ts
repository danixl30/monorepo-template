import { expect } from '../../../core/impl'
import { match } from '@mono/pattern-matching'
import { ComparationUtils as C } from '@mono/pattern-matching'

export const name = 'firstTest'
export const body = () => {
    match([1, '', '', '', 1])
        // .with(
        //     {
        //         a: C.String,
        //     },
        //     () => console.log('test matched'),
        // )
        .with(C.Array(C.Or<number | string>(1, C.String)), () =>
            console.log('arr'),
        )
        .otherwise(() => console.log('default1'))
    expect(true).equals(true)
}
