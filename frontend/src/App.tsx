import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { token, isLoading } = useAuth();
    
    if (isLoading) return <Loading />;
    if (!token) return <Navigate to="/login" />;
    
    return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
