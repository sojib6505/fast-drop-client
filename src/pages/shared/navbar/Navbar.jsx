import { Link, NavLink, useNavigate } from "react-router"
import SharedLogo from "../logo/SharedLogo"
import UseAuth from "../../../hooks/UseAuth"
import Swal from "sweetalert2";


export default function Navbar() {
    const { user, loading, signOutUser } = UseAuth()
    const navigate = useNavigate()
    if (loading) {
        return (
            <div className="navbar bg-base-100 shadow-sm rounded-sm flex justify-center">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
                <span className="loading loading-ring loading-xl"></span>
            </div>
        );
    }
    const handleSignOut = () => {
        signOutUser().then(() => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "SignOut Successfull",
                showConfirmButton: false,
                timer: 1500
            });
             navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    }
    const navItems = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/addParcel'>Add Parcel</NavLink></li>
        <li><NavLink to='/myParcel'>Dashboard</NavLink></li>
        <li><NavLink to='/coverage'>Coverage</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm rounded-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">
                    <SharedLogo></SharedLogo>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? <Link className="btn" to='/login' onClick={handleSignOut} >SignOut</Link> : <Link className="btn" to='/login'>Login</Link>}
            </div>
        </div>
    )
}
