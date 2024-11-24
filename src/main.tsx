import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/login.tsx";
import Signin from "./component/signin.tsx";
import Rolelist from "./component/Role/rolelist.tsx";
import Userlist from "./component/User/Userlist.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/userList",
        element: (
          <div className="container-fluid">
            <Userlist />
          </div>
        ),
      },
      {
        path: "/roleList",
        element: (
          <div className="container-fluid">
            <Rolelist />
          </div>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <div>Page not found</div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
