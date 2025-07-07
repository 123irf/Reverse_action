import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuctionProvider } from './contexts/AuctionContext';
import LoginForm from './components/auth/LoginForm';
import AdminLoginForm from './components/auth/AdminLoginForm';
import Header from './components/common/Header';
import AdminDashboard from './components/admin/AdminDashboard';
import SupplierDashboard from './components/supplier/SupplierDashboard';
import BuyerDashboard from './components/buyer/BuyerDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles: string[];
}> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    let targetPath = '/';
    
    // Determine where to redirect based on user role
    switch (user.role) {
      case 'admin':
        targetPath = '/admin';
        break;
      case 'supplier':
        targetPath = '/supplier';
        break;
      case 'buyer':
        targetPath = '/buyer';
        break;
    }
    
    return <Navigate to={targetPath} replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (user && location.pathname === '/login') {
      // Redirect based on role when logged in
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'supplier':
          navigate('/supplier');
          break;
        case 'buyer':
          navigate('/buyer');
          break;
      }
    } else if (user && location.pathname === '/') {
      // Default redirect based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'supplier':
          navigate('/supplier');
          break;
        case 'buyer':
          navigate('/buyer');
          break;
      }
    }
  }, [user, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/" />} />
      <Route path="/admin-login" element={!user ? <AdminLoginForm /> : <Navigate to="/" />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main>
                <AdminDashboard />
              </main>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/supplier"
        element={
          <ProtectedRoute allowedRoles={['supplier']}>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main>
                <SupplierDashboard />
              </main>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer"
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main>
                <BuyerDashboard />
              </main>
            </div>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={user ? <Navigate to={`/${user.role}`} /> : <Navigate to="/login" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AuctionProvider>
          <AppContent />
        </AuctionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;