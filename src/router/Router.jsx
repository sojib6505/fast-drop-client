import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/home/home/Home";
import AuthenticationLayouts from "../layouts/AuthenticationLayouts";
import Login from "../pages/Authentication/login/Login";
import Register from "../pages/Authentication/register/Register";
import Coverage from "../pages/coverage/Coverage";


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children:[
        {
            index:true,
            Component: Home
        },
        {
          path:'/coverage',
          Component: Coverage
        }
    ]
  },
  {
    path:"/",
    Component: AuthenticationLayouts,
    children:[
      {path:"/login",
        Component: Login
      },
      {
        path:'/register',
        Component: Register
      }
      
    ]
  }
]);
export default router