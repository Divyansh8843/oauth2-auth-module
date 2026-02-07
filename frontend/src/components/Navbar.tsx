
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Avatar from './Avatar';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                SecureAuth
            </Link>
            
            <div className="nav-links">
                {user ? (
                    <>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Avatar 
                                src={user.picture} 
                                alt={user.name} 
                                size={32} 
                            />
                            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/login" className="btn btn-primary">
                            Login
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
