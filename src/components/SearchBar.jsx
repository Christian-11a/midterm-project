  import React from 'react';
  import { FiSearch, FiSliders } from 'react-icons/fi';

  export default function SearchBar({ value, onChange, placeholder = 'Search by name or location...' }) {
    return (
      <div className="relative w-full max-w-2xl mx-auto -mt-8 mb-8 z-20">
        <div className="flex items-center bg-white rounded-full shadow-lg p-3">
          <FiSearch className="text-green-600 text-xl mx-2" />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full focus:outline-none placeholder-gray-400"
          />
        </div>
      </div>
    );
  }