import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import spaces from '../data/spaces.json';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import ConfirmationModal from '../components/ConfirmationModal';

export default function SpaceDetail() {
  const { user, addBooking, login } = useAuth();
  const navigate = useNavigate();
  const { spaceId } = useParams();
  const space = useMemo(() => spaces.find(s => String(s.id) === String(spaceId)), [spaceId]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
        date: '',
        timeslot: ''
    }
  });

  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingBooking, setPendingBooking] = useState(null);

  if (!space) return <div className="container mx-auto p-8 text-center text-gray-700">Study spot not found.</div>;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const onFormSubmit = (data) => {
    setPendingBooking(data);
    setIsModalOpen(true);
  };

  const handleAutoLoginAndBook = () => {
    login({ name: 'Guest' });

  };

  const handleBookingAttempt = () => {
    if (!user) {
      handleAutoLoginAndBook();
      return;
    }
    
    handleSubmit(onFormSubmit)();
  };

  const handleConfirmBooking = () => {
    if (!pendingBooking || !user) return; // safety check

    const booking = {
      id: uuidv4(),
      spaceId: space.id,
      spaceName: space.name,
      userName: user.name, 
      date: pendingBooking.date,
      timeslot: pendingBooking.timeslot,
      createdAt: new Date().toISOString(),
      price: space.price
    };

    addBooking(booking);
    setIsModalOpen(false);
    
    reset();
    
    setSuccess('Booking successful! You can view it on your dashboard.');
    setTimeout(() => {
      setSuccess(null);
    }, 5000); 
    
    setPendingBooking(null);
  };

  const handleCancelBooking = () => {
    setIsModalOpen(false);
    setPendingBooking(null);
  };

  const buttonText = user ? 'Book now' : 'Log In to book';
  const bookingButtonClass = user 
    ? 'bg-green-600 hover:bg-green-700' 
    : 'bg-orange-600 hover:bg-orange-700';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <img src={space.main_image} alt={space.name} className="w-full h-96 object-cover rounded-xl shadow-lg" />
          
          <div className="mt-6">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{space.name}</h2>
            <p className="text-gray-600 text-lg mb-4">{space.location}</p>
            <p className="text-gray-700 leading-relaxed">{space.description}</p>
          </div>

          <div className="mt-8">
            <h4 className="text-xl font-bold text-gray-800 mb-3">Amenities</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 ml-5 text-gray-700">
              {space.amenities.map((a, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="border border-gray-200 rounded-xl p-6 bg-gray-50 shadow-xl">
          <div className="mb-4 pb-4 border-b border-gray-200">
            <div className="text-3xl font-extrabold text-gray-900">₱{space.price}</div>
            <div className="text-md text-gray-600">{space.rate_unit}</div>
          </div>

          <form onSubmit={e => e.preventDefault()}>
            <div className="mb-5">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <input 
                id="date"
                type="date" 
                {...register('date', {
                  required: 'Date is required',
                  validate: value => new Date(value) >= today || 'You cannot book a past date.'
                })} 
                className={`w-full p-3 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500 transition-colors duration-200`}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="timeslot" className="block text-sm font-medium text-gray-700 mb-1">Choose Time Slot</label>
              <select 
                id="timeslot"
                {...register('timeslot', { required: 'Time slot is required' })} 
                className={`w-full p-3 border ${errors.timeslot ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white`}
              >
                <option value="">Select a slot</option>
                {space.time_slots.map(ts => <option key={ts} value={ts}>{ts}</option>)}
              </select>
              {errors.timeslot && <p className="text-red-500 text-sm mt-1">{errors.timeslot.message}</p>}
            </div>

            <button type="button" onClick={handleBookingAttempt} className={`w-full text-white font-bold py-3 rounded-md transition-all duration-300 ${bookingButtonClass}`}>
              {buttonText}
            </button>
          </form>
          {success && <p className="mt-4 text-center text-green-600 font-medium">{success}</p>}
        </aside>
      </div>

      <ConfirmationModal
        open={isModalOpen}
        title="Confirm Booking"
        message={
          pendingBooking 
            ? `Are you sure you want to book ${space.name} for ₱${space.price} on ${pendingBooking.date} at ${pendingBooking.timeslot}?`
            : 'Confirm your booking details.'
        }
        onConfirm={handleConfirmBooking}
        onCancel={handleCancelBooking}
      />
    </div>
  );
}