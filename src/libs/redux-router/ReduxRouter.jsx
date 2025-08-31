import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Router } from "react-router"
import { handleLocationChange } from "./action";



const ReduxRouter = ({ children, history, selector, basename }) => {
    const state = useSelector(selector);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const unlisten = history.listen((nextState) => {
            dispatch(handleLocationChange(nextState.location, nextState.action));
        });
        dispatch(handleLocationChange(history.location, history.location));
        return unlisten
    }, [history, dispatch])


    return (
        <Router
            basename={basename}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        >
            {children}
        </Router>
    )
}

ReduxRouter.defaultProps = {
    selector: ({ router }) => router,
    basename: undefined
}

export default ReduxRouter