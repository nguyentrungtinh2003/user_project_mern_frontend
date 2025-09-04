import { createBrowserRouter, Navigate, Outlet } from "react-router";
import App from "../App";
import NotFound from "./NotFound";
import Login from "./Auth/login";
import Home from "./home";
import Register from "./Auth/register";
import Landing from "./Landing";
import { useAuth } from "./contexts/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

const AdminRoute = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Landing },
      {
        path: "auth",
        Component: PublicRoute,
        children: [
          { path: "login", Component: Login },
          { path: "register", Component: Register },
        ],
      },
      {
        Component: ProtectedRoute,
        children: [{ path: "home", Component: Home }],
      },
      {
        path: "admin",
        Component: AdminRoute,
        children: [],
      },
    ],
  },

  { path: "*", Component: NotFound },
]);

export default router;