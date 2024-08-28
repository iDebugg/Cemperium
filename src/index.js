import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LogInPage from "./pages/LogInPage";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Activity from "./pages/Activity";
import Wallet from "./pages/Wallet";
import CryptoCurrency from "./pages/CryptoCurrency";
import Settings from "./pages/Settings";
import { Provider } from "react-redux";
import { store } from "./controller/store";
import PrivateRoute from "./components/PrivateRoute";  // Add this import

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "LogIn",
    element: <LogInPage />,
  },
  {
    path: "Home",
    element: <PrivateRoute element={HomePage} />,  // Protect this route
  },
  {
    path: "Activity",
    element: <PrivateRoute element={Activity} />,  // Protect this route
  },
  {
    path: "Wallet",
    element: <PrivateRoute element={Wallet} />,  // Protect this route
  },
  {
    path: "CryptoCurrency",
    element: <PrivateRoute element={CryptoCurrency} />,  // Protect this route
  },
  {
    path: "Settings",
    element: <PrivateRoute element={Settings} />,  // Protect this route
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
