import { Link, Outlet } from "react-router";
import SharedLogo from "../pages/shared/logo/SharedLogo";

export default function MyParcelLayouts() {
  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <nav className="navbar bg-base-300 px-4 fixed top-0 left-0 w-full z-50 h-16">
        <div className="flex-none lg:hidden">
          <label htmlFor="my-parcel" className="btn btn-square btn-ghost">
            ☰
          </label>
        </div>
        <div className="flex-1">
          <SharedLogo />
        </div>
      </nav>
      {/* DRAWER */}
      <div className="drawer lg:drawer-open pt-16">
        <input id="my-parcel" type="checkbox" className="drawer-toggle" />
        {/* Content */}
        <div className="drawer-content p-4">
         <Outlet></Outlet>
        </div>

        {/* SIDEBAR */}
        <div className="drawer-side top-16 h-[calc(100vh-4rem)]  border-r-4 border-base-300">
          <label htmlFor="my-parcel" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 w-64 h-full p-4">
            <li><a>Dashboard</a></li>
            <li><a>My Parcels</a></li>
            <li><Link to='/addParcel'>Add Parcel</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
