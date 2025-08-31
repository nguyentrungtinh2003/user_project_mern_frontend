import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import { RouterProvider } from 'react-router'
import router from './pages/routes'
import { Provider } from 'react-redux'
import store from './store'
import { AuthProvider } from './pages/contexts/AuthContext'


// createRoot(document.getElementById('root')).render(
//   React.createElement(Root)
// )
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  </Provider>
)
