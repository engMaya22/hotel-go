import { render } from 'preact'
import './index.css'
import { App } from './app.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

import { AppProvider } from './context/AppContext.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}


render(<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
     <BrowserRouter> 
     <AppProvider>
        <App />
     </AppProvider>
     </BrowserRouter>
    </ClerkProvider>, document.getElementById('app'))
