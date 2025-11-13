import { createBrowserRouter } from "react-router";
import App from "../App";
import {
  Layout,
  Home,
  Landing,
  Profile,
  NotFound,
  // UserManagement,
} from "./index";
import { Login, PublicRole, Register, RequireRole } from "../features/auth/components";
import { ROLES } from "../constants/roles";


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <div>Error App page</div>,
    children: [
      { index: true, Component: Landing, errorElement: <div>Error Landing page</div> },
      {
        path: "auth",
        Component: PublicRole,
        errorElement: <div>Error auth page</div>,
        children: [
          { path: "login", Component: Login, errorElement: <div>Error Login page</div> },
          { path: "register", Component: Register, errorElement: <div>Error Register page</div> },
        ],
      },
      {
        element: <RequireRole roles={[ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER]} />,
        children: [
          {
            index: "/",
            Component: Layout,
            errorElement: <div>Error Layout page</div>,
            children: [
              { path: "home", Component: Home, errorElement: <div>Error Home page</div> },
              { path: "profile", Component: Profile, errorElement: <div>Error Profile page</div> },
              // { path: "profile/:id?edit=true", Component: Profile, errorElement: <div>Error Profile edit page</div> },
            ],
          },
        ],
      },
      // {
      //   Component: AdminRoute,
      //   children: [
      //     {
      //       index: "/",
      //       Component: Layout,
      //       children: [{ path: "users", Component: UserManagement }],
      //     },
      //   ],
      // },
    ],
  },

  { path: "*", Component: NotFound },
]);

export default router;
