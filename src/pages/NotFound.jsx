import React from 'react';
import { Link } from 'react-router-dom';


export default function NotFound() {
return (
<div className="container mx-auto px-4 py-24 text-center">
<h1 className="text-4xl font-bold">404</h1>
<p className="mt-2 text-gray-600">Page not found.</p>
<Link to="/" className="mt-4 inline-block text-indigo-600">Back to home</Link>
</div>
);
}   