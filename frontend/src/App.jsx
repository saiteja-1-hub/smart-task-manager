import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AppDashboard from "./pages/AppDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<AppDashboard />} />
            </Route>
        </Routes>
    );
};

export default App;