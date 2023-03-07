import { EventProvider } from '../event-handler/context/EventProvider'
import MainWrapper from '../../../main/infraestructure/page/MainWrapper'

export default function App() {
    return (
        <>
            <EventProvider>
                <MainWrapper />
            </EventProvider>
        </>
    )
}
