import { useState, useEffect } from 'react';


// Simple useLocalStorage hook
export default function useLocalStorage(key, initialValue) {
const [state, setState] = useState(() => {
try {
const item = localStorage.getItem(key);
return item ? JSON.parse(item) : initialValue;
} catch (err) {
console.error('useLocalStorage read error:', err);
return initialValue;
}
});


useEffect(() => {
try {
localStorage.setItem(key, JSON.stringify(state));
} catch (err) {
console.error('useLocalStorage write error:', err);
}
}, [key, state]);


return [state, setState];
}