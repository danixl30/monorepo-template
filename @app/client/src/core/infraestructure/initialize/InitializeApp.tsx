import App from '../application/app'
import ReactDOM from 'react-dom/client'

export default function Bootstrap() {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <App />,
    )
}
