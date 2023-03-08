import { EventProvider } from '../event-handler/context/EventProvider'

export default function App() {
    return (
        <>
            <EventProvider>
                <h1>Hello world</h1>
            </EventProvider>
        </>
    )
}
