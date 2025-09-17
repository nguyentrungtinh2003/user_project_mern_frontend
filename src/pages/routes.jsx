import { createBrowserRouter, Navigate, Outlet } from "react-router";
import App from "../App";
import { useAuth } from "./contexts/AuthContext";
import {
  Layout,
  Home,
  Login,
  Register,
  Landing,
  Profile,
  NotFound,
  UserManagement,
} from "./index";

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
        children: [
          {
            index: "/",
            Component: Layout,
            children: [
              { path: "home", Component: Home },
              { path: "profile", Component: Profile },
            ],
          },
        ],
      },
      {
        Component: AdminRoute,
        children: [
          {
            index: "/",
            Component: Layout,
            children: [{ path: "users", Component: UserManagement }],
          },
        ],
      },
    ],
  },

  { path: "*", Component: NotFound },
]);

export default router;
