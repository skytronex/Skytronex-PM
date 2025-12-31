import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'



import { TTSProvider } from './context/TTSContext.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <TTSProvider>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </TTSProvider>
    </React.StrictMode>,
)
