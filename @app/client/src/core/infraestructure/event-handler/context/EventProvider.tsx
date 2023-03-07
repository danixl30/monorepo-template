import { ReactNode, createContext, useContext } from 'react'
import { EventHandler } from '@mono/core'
import { useEventHadler } from '@mono/core'
import { useRefValueProvider } from '../../value-provider/useRefValueProvider'

export const EventContext = createContext<EventHandler | undefined>(undefined)

type EventProviderProps = {
    children: ReactNode | ReactNode[]
}

export const getEventContext = (): EventHandler => useContext(EventContext)!

export const EventProvider = (props: EventProviderProps) => {
    const eventHandler = useEventHadler(useRefValueProvider())
    return (
        <EventContext.Provider value={eventHandler}>
            {props.children}
        </EventContext.Provider>
    )
}
