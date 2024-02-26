import { ComparationUtils as C, match } from '@mono/pattern-matching'

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
                b: C.Any,
            },
            () => console.log('arr'),
        )
        .otherwise(() => console.log('default1'))
    lookFor(true).equals(true)
}
