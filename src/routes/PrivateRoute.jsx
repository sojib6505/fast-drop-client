

import { Navigate, useLocation } from "react-router";
import UseAuth from "../hooks/UseAuth";

export default function PrivateRoute({ children }) {
    const { user, loading } = UseAuth();
    const location = useLocation();

    //  Firebase auth checking
    if (loading) {
        return (
            <div className="navbar bg-base-100 shadow-sm rounded-sm flex justify-center items-center min-h-screen">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
                <span className="loading loading-ring loading-xl"></span>
            </div>
        );
    }

    // Not logged in
    if (!user) {
        return <Navigate to="/register" state={{ from: location }} replace />;
    }

    //  Logged in
    return children;
}
