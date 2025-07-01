import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/es/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
    <App />
  </BrowserRouter>

    </PersistGate>

  </Provider>

  
)
