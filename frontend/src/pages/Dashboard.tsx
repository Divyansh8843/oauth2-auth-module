import { useEffect, useState } from 'react';
import api from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Avatar from '../components/Avatar';

const Dashboard = () => {
    const { user } = useAuth();
    const [protectedData, setProtectedData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get('/protected');
                setProtectedData(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="dashboard-layout fade-in">
            <Navbar />
            
            <div className="container dashboard-content">
                <div className="glass-card profile-header">
                    <Avatar 
                        src={user?.picture} 
                        alt={user?.name || 'User'} 
                        size={100} 
                        className="profile-avatar" 
                    />
                    <div className="profile-info">
                        <h2>Hello, {user?.name}!</h2>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{user?.email}</p>
                        <span className="role-badge">{user?.roles?.join(' • ')}</span>
                    </div>
                </div>

                <div className="grid-cols-2">
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginTop: 0 }}>API Data Status</h3>
                        {loading ? (
                            <p>Loading protected data...</p>
                        ) : protectedData ? (
                            <div style={{ background: '#ecfdf5', padding: '1rem', borderRadius: '0.5rem', color: '#065f46', border: '1px solid #a7f3d0' }}>
                                <strong>Success:</strong> Connected to secure backend endpoint.
                            </div>
                        ) : (
                            <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '0.5rem', color: '#991b1b', border: '1px solid #fecaca' }}>
                                <strong>Error:</strong> Failed to fetch data.
                            </div>
                        )}
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>
                            This card attempts to fetch data from <code>/api/protected</code> using your JWT Access Token.
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginTop: 0 }}>Session Info</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Provider</span>
                                <strong>Google OAuth2</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Login Time</span>
                                <strong>{new Date().toLocaleTimeString()}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Token Type</span>
                                <strong>Bearer JWT</strong>
                            </div>
                             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Security</span>
                                <strong>HTTP-Only Cookie</strong>
                            </div>
                        </div>
                    </div>
                </div>

                {protectedData && (
                    <div style={{ marginTop: '2rem' }}>
                        <h3>Raw Response Data</h3>
                        <pre>{JSON.stringify(protectedData, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Dashboard;
