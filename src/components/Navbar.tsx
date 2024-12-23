import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Star, Settings, Target } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-purple-600">
              Mackmeister
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/challenges" className="text-gray-600 hover:text-purple-600">
              <Target className="h-6 w-6" />
            </Link>
            <Link to="/search" className="text-gray-600 hover:text-purple-600">
              <Search className="h-6 w-6" />
            </Link>
            <Link to="/reviews" className="text-gray-600 hover:text-purple-600">
              <Star className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-purple-600">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-purple-600">
              <User className="h-6 w-6" />
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-purple-600">
              <Settings className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;