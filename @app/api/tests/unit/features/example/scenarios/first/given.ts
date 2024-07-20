export const name = `Provide dummy data start count with $number
* Provide name like $name`
export const body = (input: { number: number }) => {
    return {
        name: 'test dummy',
        count: input.number,
    }
}
