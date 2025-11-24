import { useSelector } from "react-redux"
import { selectHasAtLeast, selectIsAuthenticated } from "../authSlice"
import { Navigate, Outlet } from "react-router";

const RequireMinRole = ({ min }) => {
    const isAuth = useSelector(selectIsAuthenticated);
    const can = useSelector(selectHasAtLeast(min));

    if (!isAuth) return <Navigate to="auth/login" replace />
    if (!can) return <Navigate to="/" replace />

    return <Outlet />
}

export default RequireMinRole