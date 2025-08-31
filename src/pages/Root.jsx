import { Provider } from "react-redux"
import { ReduxRouter } from "../libs/redux-router"
import router from './routes'
import { StrictMode } from 'react'

const Root = ({ store, history }) => {
    return (
        <Provider store={store}>
            <ReduxRouter history={history}>
                <StrictMode>
                    <RouterProvider router={router} />
                </StrictMode>
            </ReduxRouter>
        </Provider>
    )
}

export default Root