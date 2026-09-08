import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import authService from "../services/authService";
import {
    getUser,
    saveAuth,
    clearAuth
} from "../utils/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        getUser()
    );

    const [loading, setLoading] =
        useState(false);

    const register = async (userData) => {

        setLoading(true);

        try {

            const data =
                await authService.register(
                    userData
                );

            if (data.token) {
                saveAuth(
                    data.token,
                    data.user
                );

                setUser(data.user);
            }

            return data;

        } finally {

            setLoading(false);

        }
    };

    const login = async (credentials) => {

        setLoading(true);

        try {

            const data =
                await authService.login(
                    credentials
                );

            if (!data.token) {
                throw new Error(
                    data.message ||
                    "Login failed"
                );
            }

            saveAuth(
                data.token,
                data.user
            );

            setUser(data.user);

            return data;

        } finally {

            setLoading(false);

        }
    };

    const logout = () => {
        clearAuth();
        setUser(null);
    };

    useEffect(() => {

        const storedUser = getUser();

        if (storedUser) {
            setUser(storedUser);
        }

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: Boolean(user),
                register,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};