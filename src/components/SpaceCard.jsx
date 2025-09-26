import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SpaceCard({ space }) {
  const navigate = useNavigate();
  const { id, name, location, price, rate_unit, main_image } = space; 

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img
        src={main_image}
        alt={name}
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-5 flex flex-col items-start gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 font-bold">{location}</p>
        
        {/* Display price with rate_unit */}
        <p className="text-sm text-gray-500 font-bold mt-2">
          ₱{price} <span className="text-xs font-normal text-gray-400">{rate_unit}</span>
        </p>

        <button
          onClick={() => navigate(`/space/${id}`)}
          className="mt-2 px-6 py-2 text-sm font-medium text-white bg-orange-600 rounded-full hover:bg-orange-700 transition-colors duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
}