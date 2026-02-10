import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/home/home/Home";
import AuthenticationLayouts from "../layouts/AuthenticationLayouts";
import Login from "../pages/Authentication/login/Login";
import Register from "../pages/Authentication/register/Register";
import Coverage from "../pages/coverage/Coverage";
import AddParcel from "../pages/addParcel/AddParcel";
import PrivateRoute from "../routes/PrivateRoute";
import MyParcelLayouts from "../layouts/MyParcelLayouts";
import MyPercel from "../pages/myParcel/MyPercel";


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
        },
        {
          path:'/addParcel',
          element: <PrivateRoute>
            <AddParcel></AddParcel>
          </PrivateRoute>
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
  },
  {
    path: '/',
    element: <PrivateRoute>
      <MyParcelLayouts></MyParcelLayouts>
    </PrivateRoute>,
    children:[
      {path:'/myParcel',
        Component: MyPercel 
      }
    ]
  }
]);
export default router