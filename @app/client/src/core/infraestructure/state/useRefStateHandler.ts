import { useEffect, useRef, useState } from 'react'
import { StateProvider } from '../../application/state/state-provider'

export const useRefStateFactory = () => {
    const [_, forceUpdate] = useState(0)
    const isMounted = useRef(true)

    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    return <T>(initialize: T): StateProvider<T> => {
        const subscriptors = useRef<((value: T) => void)[]>([])
        const firstTime = useRef(true)
        const state = useRef(initialize)

        useEffect(() => {
            if (firstTime.current) {
                firstTime.current = false
                return
            }
            subscriptors.current.forEach((e) => e(state.current))
        }, [state])

        return {
            state: {
                get value() {
                    return state.current
                },
                getValue: () => state.current,
                subscribe(callback: (value: T) => void) {
                    subscriptors.current.push(callback)
                },
            },
            setState(value: T) {
                if (!isMounted.current) return
                forceUpdate((value) => ++value)
                state.current = value
            },
        }
    }
}
