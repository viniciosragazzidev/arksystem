import React,{useContext} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/global.css";
import Home from "./pages/Home/home";
import Pnf from "./pages/pageNotFound/pnf";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import AppPage from "./pages/AppPage/appPage";




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Pnf />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register", // Adicionando um parâmetro chamado authType
        element: <Register />,
      },
      {
        path: "/login", // Adicionando um parâmetro chamado authType
        element: <Login />,
      },
      {
        path: "/app", // Adicionando um parâmetro chamado authType
        element: <AppPage />,

        children: [
          {
            path: "/app/dashboard", //
            element: <AppPage />,
          },
        ]
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
