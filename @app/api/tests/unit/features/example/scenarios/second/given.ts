export const name =
    'Provide dummy data start count with $number and name $name :'
export const body = (input: { number: number; name: string }) => {
    console.log(input)
    return {
        count: input.number,
        name: input.name,
    }
}
