import { Outlet } from "react-router";
import Home from "../pages/home/home/Home";
import Footer from "../pages/shared/footer/Footer";
import Navbar from "../pages/shared/navbar/Navbar";

export default function RootLayouts() {
  return (
    <div className="">
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
