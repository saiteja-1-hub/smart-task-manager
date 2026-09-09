import { Routes, Route, Navigate } from "react-router-dom";

import AppDashboard from "./pages/AppDashboard";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AppDashboard />} />

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
};

export default App;