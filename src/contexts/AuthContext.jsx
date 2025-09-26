import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('studyspot_user', null);
  const [bookings, setBookings] = useLocalStorage('studyspot_bookings', []);

  const login = (payload) => {
    setUser(payload);
  };

  const logout = () => {
    setUser(null);
  };

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, bookings, addBooking, cancelBooking }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}