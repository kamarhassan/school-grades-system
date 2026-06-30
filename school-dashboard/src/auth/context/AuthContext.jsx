import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../../services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // التحقق من المستخدم عند تشغيل التطبيق
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await authService.me();

            // غالبًا Laravel يرجع user مباشرة أو داخل data
            setUser(response.user || response.data);
        } catch (error) {
            log
            setUser(null);
            localStorage.removeItem("token"); // حماية
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
    const response = await authService.login(credentials);

    console.log("LOGIN RESPONSE:", response);
    console.log("TOKEN:", response.token);

    localStorage.setItem("token", response.token);

    console.log("STORED TOKEN:", localStorage.getItem("token"));

    await checkAuth();

    return response;
};
    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            localStorage.removeItem("token");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
