import { useGoogleLogin } from '@react-oauth/google';
import api from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            try {
                const { code } = codeResponse;
                const { data } = await api.post('/auth/google', { code });
                login(data.accessToken, data.user);
                navigate('/dashboard');
            } catch (error) {
                console.error('Login failed:', error);
            }
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <div style={{ background: 'var(--bg-gradient)', minHeight: '100vh' }}>
            <Navbar />
            <div className="auth-wrapper fade-in">
                <div className="auth-card glass-card">
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ width: 64, height: 64, background: '#e0e7ff', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', marginBottom: '1rem' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                        </div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Please sign in to continue to your dashboard</p>
                    </div>
                    
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => googleLogin()}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1rem' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Continue with Google
                    </button>

                    <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <p>By signing in, you agree to our Terms of Service and Privacy Policy.</p>
                        <p style={{ marginTop: '1rem' }}>
                            <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>&larr; Back to Home</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
