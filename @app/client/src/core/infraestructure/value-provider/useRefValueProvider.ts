import { ValueProvider } from '@mono/core'
import { useRef } from 'react'

export const useRefValueProvider =
    (): ValueProvider =>
    <T>(initialValue: T) => {
        const ref = useRef<T>(initialValue)

        return {
            get value(): T {
                return ref.current
            },
            set value(value: T) {
                ref.current = value
            },
        }
    }
