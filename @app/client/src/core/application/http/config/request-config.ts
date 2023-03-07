import { Dictionary } from '@mono/types-utils'

export type RequestConfiguration<T> = {
    url: string
    body?: T
    headers?: Dictionary<string>
    queries?: Dictionary<string>
}
