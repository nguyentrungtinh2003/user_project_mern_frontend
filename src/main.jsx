import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import { RouterProvider } from "react-router";
import router from "./pages/routes";
import { Provider } from "react-redux";
import store from "./app/store";
// import { AuthProvider } from "./pages/contexts/AuthContext";
import { Toaster } from "./components/ui/sonner";


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <Toaster position="top-right" duration={1500} />
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>,
);
