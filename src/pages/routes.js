import { createBrowserRouter } from 'react-router'
import App from '../App'
import NotFound from './NotFound'
import Login from './Auth/login'
import Home from './home'
import { Register } from './Auth/register'

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            { index: true, Component: Home },
            {
                path: 'auth',
                children: [
                    { path: 'login', Component: Login },
                    { path: 'register', Component: Register },
                ],
            },
        ],
    },
    { path: '*', Component: NotFound },
])

export default router
