
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center',
            background: 'var(--bg-gradient)',
            color: 'var(--text-main)'
        }}>
            <h1 style={{ fontSize: '6rem', margin: 0, color: 'var(--primary)' }}>404</h1>
            <h2 style={{ fontSize: '2rem', marginTop: '1rem' }}>Page Not Found</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                The page you are looking for does not exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
