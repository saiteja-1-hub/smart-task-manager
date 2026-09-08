export const saveAuth = (token, user) => {
    localStorage.setItem("token", token);

    if (user) {
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );
    }
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getUser = () => {
    const user = localStorage.getItem("user");

    if (!user) {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch {
        return null;
    }
};

export const isAuthenticated = () => {
    return Boolean(getToken());
};

export const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const logout = () => {
    clearAuth();
    window.location.href = "/login";
};