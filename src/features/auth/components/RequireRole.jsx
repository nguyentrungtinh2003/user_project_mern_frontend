import { useSelector } from "react-redux"
import { selectHasAnyRole, selectIsAuthenticated } from "../authSlice"
import { Navigate, Outlet, useLocation } from "react-router";

const RequireRole = ({ roles }) => {
    const isAuth = useSelector(selectIsAuthenticated);
    const can = useSelector(selectHasAnyRole(roles));
    const location = useLocation();

    if (!isAuth) return <Navigate to="auth/login" replace state={{ from: location }} />
    if (!can) return <Navigate to="/" replace />


    return <Outlet />
}

export default RequireRole