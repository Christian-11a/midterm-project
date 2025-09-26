import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ConfirmationModal from '../components/ConfirmationModal';
import SortControls from '../components/SortControls'; // 🔑 Import SortControls
import useLocalStorage from '../hooks/useLocalStorage'; // 🔑 Import useLocalStorage
import { FiCalendar, FiClock, FiDollarSign, FiTrash2, FiMapPin, FiFlag, FiUser } from 'react-icons/fi';

export default function Dashboard() {
  const { user, bookings, cancelBooking } = useAuth(); 
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  
  const [sortOrder, setSortOrder] = useLocalStorage('dashboard_sort_order', 'date-asc');

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to StudySpot</h2>
        <p className="text-gray-600 mt-2">Please log in to view your dashboard and bookings.</p>
      </div>
    );
  }

  const onCancel = (booking) => {
    setSelected(booking);
    setOpen(true);
  };

  const confirmDelete = () => {
    cancelBooking(selected.id);
    setOpen(false);
    setSelected(null);
  };

  const sortedBookings = useMemo(() => {
    let currentBookings = [...bookings]; 

    switch (sortOrder) {
      case 'name-asc':
          currentBookings.sort((a, b) => a.spaceName.localeCompare(b.spaceName));
          break;
      case 'name-desc':
          currentBookings.sort((a, b) => b.spaceName.localeCompare(a.spaceName));
          break;
      case 'price-asc':
          currentBookings.sort((a, b) => a.price - b.price);
          break;
      case 'price-desc':
          currentBookings.sort((a, b) => b.price - a.price);
          break;
      case 'date-asc':
          currentBookings.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
      case 'date-desc':
          currentBookings.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
      default:
        currentBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return currentBookings;
  }, [bookings, sortOrder]);

  const displayBookings = sortedBookings; 

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Hello, {user.name}! 
        </h1>
        <p className="text-gray-500 mt-1">Manage all study spot reservations here.</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All System Bookings ({displayBookings.length})</h2>
        
        <SortControls 
          currentSort={sortOrder} 
          onSortChange={setSortOrder} 
        />
      </div>
      
      {displayBookings.length === 0 ? (
        <div className="p-8 bg-white border border-dashed border-gray-300 rounded-xl text-center">
          <FiFlag className="mx-auto w-10 h-10 text-green-500 mb-3" />
          <p className="text-lg font-medium text-gray-700">No active bookings in the system yet.</p>
          <p className="text-gray-500 text-sm">Find a spot from the Home page to get started!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {displayBookings.map(b => (
            <div key={b.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-1">
                  <FiMapPin className="w-5 h-5 text-green-600" />
                  <div className="font-extrabold text-xl text-gray-900">{b.spaceName}</div>
                </div>
                <p className="flex items-center text-gray-600 text-sm mb-2">
                  <FiUser className="w-4 h-4 mr-1" /> Booked by: <span className="font-semibold ml-1">{b.userName}</span>
                </p>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Confirmed
                </span>
              </div>

              <div className="md:col-span-1 space-y-2 text-sm">
                <p className="flex items-center text-gray-700">
                  <FiCalendar className="w-4 h-4 mr-2 text-orange-500" />
                  <span className="font-semibold">{b.date}</span>
                </p>
                <p className="flex items-center text-gray-700">
                  <FiClock className="w-4 h-4 mr-2 text-orange-500" />
                  <span className="font-semibold">{b.timeslot}</span>
                </p>
                <p className="flex items-center text-gray-700">
                  <FiDollarSign className="w-4 h-4 mr-2 text-orange-500" />
                  <span className="font-semibold">₱{b.price}</span>
                </p>
              </div>

              <div className="md:col-span-1 flex justify-end">
                <button 
                  onClick={() => onCancel(b)} 
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-300 font-medium text-sm"
                >
                  <FiTrash2 /> Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal
        open={open}
        title="Confirm Cancellation"
        message={`Are you sure you want to cancel the booking for ${selected?.userName} at ${selected?.spaceName} on ${selected?.date}? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => { setOpen(false); setSelected(null); }}
      />
    </div>
  );
}