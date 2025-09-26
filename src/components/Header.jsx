import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiLogIn, FiLogOut, FiFlag } from 'react-icons/fi';
import ConfirmationModal from './ConfirmationModal';

export default function Header() {

  const { user, login, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAutoLogin = () => {
    login({ name: 'Guest' });
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setIsModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <div className="text-2xl font-bold flex items-center">
            <span className="text-orange-600">StudySpot</span>
            <span className="bg-green-600 text-white px-2 py-1 rounded-md text-sm font-bold ml-1">
              PH
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({ isActive }) => `text-gray-700 font-medium ${isActive ? 'text-green-600' : ''}`}>Home</NavLink>
          {user && (
            <NavLink to="/dashboard/my-bookings" className={({ isActive }) => `text-gray-700 font-medium ${isActive ? 'text-green-600' : ''}`}>Dashboard</NavLink>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600 hidden sm:block">Hello, {user.name}</div>
              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-md"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          ) : (
            
            <button 
              onClick={handleAutoLogin} 
              className="flex items-center gap-2 text-white px-3 py-1 rounded-full bg-orange-600 hover:bg-orange-700 transition-colors duration-300"
            >
              <FiLogIn /> Login
            </button>
          )}
        </nav>
      </div>
      
      <ConfirmationModal
        open={isModalOpen}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </header>
  );
}