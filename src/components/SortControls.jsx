import React from 'react';

const SORT_OPTIONS = [
  
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
    { value: 'date-asc', label: 'Date: Soonest First' }, 
    { value: 'date-desc', label: 'Date: Latest First' },
];

export default function SortControls({ onSortChange, currentSort }) {
    return (
        <div className="flex justify-end mb-6">
            <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700 mr-3 self-center">
                Sort by:
            </label>
            <select
                id="sort-select"
                value={currentSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="mt-1 block w-full md:w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md shadow-sm"
            >
                {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}