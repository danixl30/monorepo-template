import { OnInit } from '../../application/on-init/on-init'
import { OnInitJob } from '../../application/on-init-job/on-init-job'
import { Optional } from '@mono/types-utils'
import { StateFactory } from '../../application/state/state-factory'
import { StateObserver } from '../../application/state-observers/state-observer'
import { StateViewer } from '../../application/state/state-provider'

export const nativeOnInitJob =
    (
        stateFactory: StateFactory,
        stateObserver: StateObserver,
        onInit: OnInit,
    ): OnInitJob =>
    <T, U>(callback: () => Promise<T>, ...args: StateViewer<U>[]) => {
        const dataState = stateFactory<Optional<T>>(null)
        const loadingState = stateFactory(false)
        const errorState = stateFactory<Optional<Error>>(null)
        const reloadingState = stateFactory(false)

        const job = async () => {
            dataState.setState(null)
            errorState.setState(null)
            try {
                const res = await callback()
                dataState.setState(res)
            } catch (e) {
                errorState.setState(e as Error)
            }
            loadingState.setState(false)
            reloadingState.setState(false)
        }

        onInit(() => {
            loadingState.setState(true)
            job()
        })

        const reload = () => {
            if (reloadingState.state.value || loadingState.state.value)
                throw new Error('Is in job')
            reloadingState.setState(true)
            job()
        }

        const silentReload = () => {
            if (reloadingState.state.value || loadingState.state.value)
                throw new Error('Is in job')
            job()
        }

        const mutate = (callback: (data: Optional<T>) => Optional<T>) => {
            dataState.setState(callback(dataState.state.value))
        }

        stateObserver(reload, ...args)

        return {
            reload,
            data: dataState.state,
            error: errorState.state,
            isLoading: loadingState.state,
            isReloading: reloadingState.state,
            silentReload,
            mutate,
        }
    }
