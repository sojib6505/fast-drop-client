import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/home/home/Home";
import AuthenticationLayouts from "../layouts/AuthenticationLayouts";
import Login from "../pages/Authentication/login/Login";
import Register from "../pages/Authentication/register/Register";
import Coverage from "../pages/coverage/Coverage";
import AddParcel from "../pages/addParcel/AddParcel";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayouts from "../layouts/DashboardLayouts";
import MyPercel from "../pages/dashboard/MyPercel";
import Payment from "../pages/dashboard/payment/payment";



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
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayouts></DashboardLayouts>
    </PrivateRoute>,
    children:[
      {path:'myParcel',
        Component: MyPercel 
      },
      {
        path:'payment/:parcelId',
        Component: Payment
      }
    ]
  }
]);
export default router