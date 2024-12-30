import React, { useState } from 'react';
import { products } from '../data/products';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  // Challenge 7: SQL Injection
  const searchProducts = () => {
    // Intentionally vulnerable: Raw SQL query simulation
    console.log(`SELECT * FROM products WHERE name LIKE '%${query}%'`);
    setResults(products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())));
  };

  // Challenge 8: NoSQL Injection
  const searchByCategory = (category: string) => {
    // Intentionally vulnerable: NoSQL injection simulation
    console.log(`db.products.find({ category: ${category} })`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Search Products</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={searchProducts}
          className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map(product => (
          <div key={product.id} className="p-4 border rounded">
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;