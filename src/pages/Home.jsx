import React, { useState, useMemo } from 'react';
import spaces from '../data/spaces.json';
import SpaceCard from '../components/SpaceCard';
import SearchBar from '../components/SearchBar';
import HeroSection from '../components/HeroSection';
import SortControls from '../components/SortControls';
import useLocalStorage from '../hooks/useLocalStorage'; 

export default function Home() {
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useLocalStorage('studyspot_sort_order', 'name-asc'); 
  const filtered = useMemo(() => {
    let currentSpaces = [...spaces]; 
    // Apply filtering
    const q = query.trim().toLowerCase();
    if (q) {
      currentSpaces = currentSpaces.filter(s => 
        s.name.toLowerCase().includes(q) || s.location.toLowerCase().includes(q)
      );
    }
    // Sorting logic based on sortOrder
    switch (sortOrder) {
      case 'name-asc':
        currentSpaces.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        currentSpaces.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        currentSpaces.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        currentSpaces.sort((a, b) => b.price - a.price);
        break;
      default:
        // No sorting
        break;
    }

    return currentSpaces;
  }, [query, sortOrder]);

  return (
    <div>
      <HeroSection />
      
      <SearchBar value={query} onChange={setQuery} />

      <main className="container mx-auto px-4 py-6">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-left">Find Spaces</h2>
          
          <SortControls 
            currentSort={sortOrder} 
            onSortChange={setSortOrder} 
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          {filtered.map(space => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      </main>
    </div>
  );
}