import { Provider } from "react-redux";
import { ReduxRouter } from "../libs/redux-router";
import router from "./routes";
import { StrictMode } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/sonner";

const Root = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ReduxRouter history={history}>
        <StrictMode>
          <AuthProvider>
            <Toaster position="top-right" duration={1500} />
            <RouterProvider router={router} />
          </AuthProvider>
        </StrictMode>
      </ReduxRouter>
    </Provider>
  );
};

export default Root;
