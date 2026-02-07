
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className="dashboard-layout fade-in">
            <Navbar />
            
            <main>
                <section className="hero">
                    <div className="container">
                        <h1>Secure Authentication<br />Simplified for Developers.</h1>
                        <p>
                            A production-ready OAuth2 implementation using Google Sign-In, 
                            JWT Access & Refresh Tokens, and HTTP-Only Cookies.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Link to="/login" className="btn btn-primary">Get Started</Link>
                            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                View on GitHub
                            </a>
                        </div>
                    </div>
                </section>

                <section className="container" style={{ padding: '4rem 1rem' }}>
                    <div className="grid-cols-2">
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ width: 48, height: 48, background: '#e0e7ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#4f46e5' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <h3>Enterprise Security</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Built with industry standards including HTTP-only cookies, 
                                CSRF protection, and short-lived access tokens.
                            </p>
                        </div>
                        
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ width: 48, height: 48, background: '#fce7f3', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#ec4899' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                            </div>
                            <h3>Instant Integration</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Ready-to-use React hooks and backend middleware make integration 
                                into your existing stack seamless.
                            </p>
                        </div>

                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ width: 48, height: 48, background: '#dcfce7', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#10b981' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                            </div>
                            <h3>User Friendly</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Frictionless login experience with social auth providers 
                                that your users already trust.
                            </p>
                        </div>

                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ width: 48, height: 48, background: '#ffedd5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#f97316' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                            </div>
                            <h3>Persistent Sessions</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Secure refresh token rotation keeps users logged in 
                                without compromising on security.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <p>&copy; 2024 SecureAuth. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
