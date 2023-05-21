import { createBrowserRouter, RouteObject } from "react-router-dom";
import { DefaultLayout } from "../layouts/default";
import { Dashboard } from "../pages/Dashboard/Dashboard";
// import Login from "../pages/Login/Login";
// import { Register } from "../pages/Register/Register";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [{
      path: "dashboard",
      element: <Dashboard />,
      children: [],
    },],
  },
//   {
//     path: "login",
//     element: <Login />,
//     children: [],
//   },
//   {
//     path: "register",
//     element: <Register />,
//     children: [],
//   },
  
];

export const router = createBrowserRouter(appRoutes)