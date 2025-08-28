import { NavLink } from "react-router"

const NotFound = () => {
    return (
        <>
            <h1>Not found page</h1>
            <div>404</div>
            <NavLink to='/'>Back home</NavLink>
        </>
    )
}

export default NotFound