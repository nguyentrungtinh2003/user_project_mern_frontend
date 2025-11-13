import { useSelector } from "react-redux"
import { selectIsAuthenticated } from "../authSlice"
import { Navigate, Outlet } from "react-router";

const PublicRole = () => {
    const isAuth = useSelector(selectIsAuthenticated);
    return isAuth ? <Navigate to="/home" replace /> : <Outlet />
}

export default PublicRole