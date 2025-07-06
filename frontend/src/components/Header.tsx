import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, Smartphone, Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import AuthModal from './AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, login, signup, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Orders', path: '/orders' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Handle cart navigation
  const handleCartClick = () => {
    navigate('/cart');
  };

  // Handle authentication
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      setIsAuthModalOpen(false);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleSignup = async (userData: any) => {
    try {
      await signup(userData);
      setIsAuthModalOpen(false);
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsProfileOpen(false);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-white dark:bg-dark-primary shadow-lg sticky top-0 z-50 transition-colors duration-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-dark-text-primary">TechStore</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-gray-700 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium ${
                    isActive(item.path) ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search Bar and Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-secondary text-gray-900 dark:text-dark-text-primary placeholder-gray-500 dark:placeholder-dark-text-muted"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-dark-text-muted" />
              </div>
              <button 
                onClick={handleCartClick}
                className="relative p-2 text-gray-700 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-2 text-gray-700 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <User className="h-6 w-6" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-secondary rounded-lg shadow-lg border border-gray-200 dark:border-dark-border py-2 z-50">
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-border">
                          <p className="text-sm font-medium text-gray-900 dark:text-dark-text-primary">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-dark-text-muted">{user?.email}</p>
                        </div>
                        <button
                          onClick={toggleDarkMode}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-tertiary transition-colors"
                        >
                          {isDarkMode ? (
                            <>
                              <Sun className="h-4 w-4 mr-3" />
                              Light Mode
                            </>
                          ) : (
                            <>
                              <Moon className="h-4 w-4 mr-3" />
                              Dark Mode
                            </>
                          )}
                        </button>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-tertiary transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-tertiary transition-colors"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={toggleDarkMode}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-tertiary transition-colors"
                        >
                          {isDarkMode ? (
                            <>
                              <Sun className="h-4 w-4 mr-3" />
                              Light Mode
                            </>
                          ) : (
                            <>
                              <Moon className="h-4 w-4 mr-3" />
                              Dark Mode
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => openAuthModal('login')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-tertiary transition-colors"
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => openAuthModal('signup')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-tertiary transition-colors"
                        >
                          Sign Up
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-dark-border">
              <nav className="flex flex-col space-y-2 pt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-gray-700 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium py-2 ${
                      isActive(item.path) ? 'text-blue-600 dark:text-blue-400' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={handleCartClick}
                    className="relative p-2 text-gray-700 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center p-2 text-gray-700 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                  </button>
                  {isAuthenticated ? (
                    <button 
                      onClick={handleLogout}
                      className="p-2 text-gray-700 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <LogOut className="h-6 w-6" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => openAuthModal('login')}
                      className="p-2 text-gray-700 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <User className="h-6 w-6" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </>
  );
};

export default Header;