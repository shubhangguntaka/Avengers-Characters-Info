// src/components/Navbar.jsx
import { useState } from "react";
import { useColorTheme } from '../ColorThemeContext';

const Navbar = ({ onHomeClick, onTimelineClick, onMoviesClick, onSearchCharacter  }) => {
// Add this prop to the component
  const [isOpen, setIsOpen] = useState(false);
  const { color } = useColorTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchCharacter && searchTerm.trim()) {
      onSearchCharacter(searchTerm.trim());
      setSearchTerm('');
      setIsOpen(false);
    }
  };
  return (
    <nav className="fixed top-0 left-0 h-30 w-full z-50 flex justify-between items-center bg-opacity-95">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <div>
          <img
            src="/avengers.png"
            alt="Avengers"
            className="h-20"
            loading="lazy"
          />
        </div>
        <div className="text-2xl font-bold">
          <h2 className="font-[Avengers] text-4xl font-bold" loading="lazy">Avengers</h2>
        </div>
      </div>
      {/* Hamburger for mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ backgroundColor: color, transition: 'background-color 0.6s cubic-bezier(0.4,0,0.2,1)' }}
          className="text-white p-2 rounded-lg shadow-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`font-[Avengers] md:flex space-x-20 ${isOpen ? "flex" : "hidden"
          } md:block absolute md:static top-24 left-0 right-0 md:bg-transparent p-4 md:p-10 flex-col md:flex-row items-end md:items-center justify-end`}
      >
        <button
          onClick={() => { setIsOpen(false); onHomeClick && onHomeClick(); }}
          style={{ backgroundColor: color, transition: 'background-color 0.6s cubic-bezier(0.4,0,0.2,1)' }}
          className="block md:inline-block text-2xl hover:text-gray-300 py-2 md:py-0 text-white md:bg-transparent border-none cursor-pointer rounded-lg shadow-lg mb-2 md:mb-0 px-6 md:px-0 transition-all duration-200"
        >
          home
        </button>
        <button
          onClick={() => { setIsOpen(false); onTimelineClick && onTimelineClick(); }}
          style={{ backgroundColor: color, transition: 'background-color 0.6s cubic-bezier(0.4,0,0.2,1)' }}
          className="block md:inline-block text-2xl hover:text-gray-300 py-2 md:py-0 text-white md:bg-transparent border-none cursor-pointer rounded-lg shadow-lg mb-2 md:mb-0 px-6 md:px-0 transition-all duration-200"
        >
          time line
        </button>
        <button
          onClick={() => { setIsOpen(false); onMoviesClick && onMoviesClick(); }}
          style={{ backgroundColor: color, transition: 'background-color 0.6s cubic-bezier(0.4,0,0.2,1)' }}
          className="block md:inline-block text-2xl hover:text-gray-300 py-2 md:py-0 text-white md:bg-transparent border-none cursor-pointer rounded-lg shadow-lg mb-2 md:mb-0 px-6 md:px-0 transition-all duration-200"
        >
          movies
        </button>
         {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center bg-white/10 px-3 py-1 rounded-full">
          <input
            type="text"
            placeholder="Search character..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-white placeholder-gray-300 outline-none px-2"
          />
          <button type="submit" 
          style={{ backgroundColor: color, transition: 'background-color 0.6s cubic-bezier(0.4,0,0.2,1)' }}
          className="text-white px-2 hover:text-gray-300">
            🔍
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
