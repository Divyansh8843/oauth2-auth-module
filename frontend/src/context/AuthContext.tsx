import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAuthToken } from '../utils/axiosInstance';

interface AuthContextType {
    user: any;
    token: string | null;
    login: (token: string, user: any) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = (newToken: string, newUser: any) => {
        setToken(newToken);
        setUser(newUser);
        setAuthToken(newToken);
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (e) {
            console.error(e);
        }
        setToken(null);
        setUser(null);
        setAuthToken(null);
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Try to get new token via refresh cookie
                const { data } = await api.post('/auth/refresh');
                setToken(data.accessToken);
                setAuthToken(data.accessToken);
                
                // Then get profile
                const profileRes = await api.get('/auth/profile');
                setUser(profileRes.data);
            } catch (error) {
                // Not authenticated
                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
