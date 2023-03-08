import { useEffect, useRef, useState } from 'react'
import { StateProvider } from '../../application/state/state-provider'

export const useStateFactory = () => {
    const isMounted = useRef(true)

    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    return <T>(initialize: T): StateProvider<T> => {
        const subscriptors = useRef<((value: T) => void)[]>([])
        const [state, setState] = useState<T>(initialize)
        const firstTime = useRef(true)
        let stateCache = state

        useEffect(() => {
            if (firstTime.current) {
                firstTime.current = false
                return
            }
            subscriptors.current.forEach((e) => e(state))
        }, [state])

        return {
            state: {
                get value() {
                    return stateCache
                },
                getValue: () => state,
                subscribe(callback: (value: T) => void) {
                    subscriptors.current.push(callback)
                },
            },
            setState(value: T) {
                if (!isMounted.current) return
                stateCache = value
                setState(() => value)
            },
        }
    }
}
