import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Wait until authentication state is loaded
    if (loading) {
        return <Loading text="Checking authentication..." />;
    }

    // User is not logged in
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    // User is authenticated
    return <Outlet />;
};

export default ProtectedRoute;