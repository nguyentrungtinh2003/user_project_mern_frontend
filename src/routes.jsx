import { createBrowserRouter } from "react-router";
import App from "./App";
import NotFound from "./pages/notFound";

const router = createBrowserRouter([
    {
        path: '/', Component: App, children: [
            { index: true }
        ]
    },
    { path: '*', Component: NotFound }
])

export default router