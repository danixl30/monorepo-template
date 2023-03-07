import { ArgumentTypes } from '@mono/types-utils'
import { Optional } from '@mono/types-utils'
import { StateViewer } from '../../state/state-provider'

export type OnTask = () => {
    success?: () => void
    error?: (error: Error) => void
}

export type JobStateLazy<T, U extends Function> = {
    data: StateViewer<Optional<T>>
    error: StateViewer<Optional<Error>>
    isLoading: StateViewer<boolean>
    do: (...args: ArgumentTypes<U>) => Promise<T>
}

export type OnInitJobLazy = <T, U extends Function>(
    callback: (...args: ArgumentTypes<U>) => Promise<T>,
    onTask?: OnTask,
) => JobStateLazy<T, U>
