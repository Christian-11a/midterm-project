import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollonTop from './components/ScrollonTop'; 
import Header from './components/Header';
import Home from './pages/Home';
import SpaceDetail from './pages/SpaceDetail';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollonTop /> 
        
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/space/:spaceId" element={<SpaceDetail />} />
            <Route path="/dashboard/my-bookings" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}