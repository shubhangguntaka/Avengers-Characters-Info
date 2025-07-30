// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ColorThemeProvider } from './ColorThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Timeline from './components/Timeline';
import Movies from './components/Movies';
import { useState, useRef } from 'react';
import characters from './assets/characters';

function Home() {
  // Lift currentCharacter state up from HeroSection
  const [currentCharacterIdx, setCurrentCharacterIdx] = useState(0);
  const currentCharacter = characters[currentCharacterIdx];

  // Refs for scrolling
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const moviesRef = useRef(null);

  // Scroll handlers
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const scrollToTimeline = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToMovies = () => {
    if (moviesRef.current) {
      moviesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchCharacter = (name) => {
    const index = characters.findIndex((char) =>
      char.name.toLowerCase().includes(name.toLowerCase())
    );
    if (index !== -1) {
      setCurrentCharacterIdx(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert(`Character "${name}" not found.`);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <Navbar
        onHomeClick={scrollToTop}
        onTimelineClick={scrollToTimeline}
        onMoviesClick={scrollToMovies}
        onSearchCharacter={handleSearchCharacter}
      />
      <div className="pt-20">
        <div ref={heroRef} />
        <HeroSection
          currentCharacter={currentCharacter}
          setCurrentCharacterIdx={setCurrentCharacterIdx}
          currentCharacterIdx={currentCharacterIdx}
          characters={characters}
        />
        <div ref={timelineRef} />
        <Timeline character={currentCharacter} />
        <div ref={moviesRef} />
        <Movies />
      </div>
      <footer>Copyright © Shubhang. 2025</footer>
    </div>
  );
}

function Landing() {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Auto navigate to Home after video ends
  const handleVideoEnd = () => {
    navigate("/home");
  };

  const handleEnterClick = () => {
    navigate("/home");
  };

  return (
    <div className="relative w-full h-screen font-sans overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/landing.mp4"
        autoPlay
        loop={false}
        onEnded={handleVideoEnd}
      />
      {/* Skip button styled like Prime Video, bottom right, mobile responsive */}
      <div className="absolute bottom-8 right-8 z-20 sm:bottom-4 sm:right-4">
        <button
          onClick={handleEnterClick}
          className="px-6 py-3 opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.5)' }}
        >
          Skip
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ColorThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </ColorThemeProvider>
  );
}
