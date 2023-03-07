import { Optional } from '@mono/types-utils'
import { StateViewer } from '../../state/state-provider'

export type PaginationResult<T> = {
    data: StateViewer<T[]>
    error: StateViewer<Optional<Error>>
    isLoading: StateViewer<boolean>
    page: StateViewer<number>
    isTop: StateViewer<boolean>
    reset(): void
    increment(): void
    previousPage(): void
    setPage(page: number): void
    mutate(callback: (data: T[]) => T[]): void
}
