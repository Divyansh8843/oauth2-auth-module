import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
});

export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // If 401 and not already retrying, and NOT a refresh attempt itself
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
            originalRequest._retry = true;
            try {
                // Attempt to refresh token
                const { data } = await api.post('/auth/refresh');
                const newToken = data.accessToken;
                setAuthToken(newToken);
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (err) {
                // If refresh fails, we throw logic to let the caller handle redirection or let the context know
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
