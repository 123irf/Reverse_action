import React, { useState } from 'react';
import { LogOut, User, Shield, Menu, X, Package } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-5 h-5 text-orange-600" />;
      case 'buyer':
        return <Package className="w-5 h-5 text-orange-600" />;
      case 'supplier':
        return <User className="w-5 h-5 text-orange-600" />;
      default:
        return <User className="w-5 h-5 text-orange-600" />;
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center min-w-0">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <img 
                  src="/befach.jpg" 
                  alt="Befach International Logo" 
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
                <div className="ml-2 sm:ml-3 min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Reverse Auction Tool</h1>
                  <p className="text-xs text-orange-600 font-medium hidden sm:block">Reduce your product cost. Maximize profit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Navigation Links */}
            <div className="flex space-x-2 mr-4">
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/admin')
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center">
                    <Shield className="w-4 h-4 mr-1.5" />
                    Admin Dashboard
                  </span>
                </Link>
              )}
              {user?.role === 'buyer' && (
                <Link
                  to="/buyer"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/buyer')
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center">
                    <Package className="w-4 h-4 mr-1.5" />
                    Buyer Dashboard
                  </span>
                </Link>
              )}
              {user?.role === 'supplier' && (
                <Link
                  to="/supplier"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/supplier')
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1.5" />
                    Supplier Dashboard
                  </span>
                </Link>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {getRoleIcon(user?.role || '')}
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user?.name}</div>
                <div className="text-gray-500 capitalize">{user?.role}</div>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 py-3 space-y-3">
            {/* User Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getRoleIcon(user?.role || '')}
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{user?.name}</div>
                  <div className="text-gray-500 capitalize">{user?.role}</div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/admin')
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <Shield className="w-4 h-4 mr-1.5" />
                    Admin Dashboard
                  </span>
                </Link>
              )}
              {user?.role === 'buyer' && (
                <Link
                  to="/buyer"
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/buyer')
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <Package className="w-4 h-4 mr-1.5" />
                    Buyer Dashboard
                  </span>
                </Link>
              )}
              {user?.role === 'supplier' && (
                <Link
                  to="/supplier"
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/supplier')
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1.5" />
                    Supplier Dashboard
                  </span>
                </Link>
              )}
            </div>

            {/* Logout */}
            <div className="pt-2 border-t border-gray-200">
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;