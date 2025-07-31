// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ColorThemeProvider } from './ColorThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Timeline from './components/Timeline';
import Movies from './components/Movies';
import { useState, useRef, useEffect } from 'react';
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
  const [muted, setMuted] = useState(true);

  // Auto navigate to Home after video ends
  const handleVideoEnd = () => {
    navigate("/home");
  };

  const handleEnterClick = () => {
    navigate("/home");
  };

  // Toggle mute state
  const handleMuteToggle = () => {
    setMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      // Try to play the video on mount
      videoRef.current
        .play()
        .catch((err) => console.warn("Autoplay blocked:", err));
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <div className="relative w-full h-screen font-sans overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/landing.mp4"
        autoPlay
        muted={muted}
        playsInline
        controls={false}
        disablePictureInPicture
        loop={false}
        onEnded={handleVideoEnd}
      />
      {/* Skip button styled like Prime Video, top right, mobile responsive */}
      <div className="absolute top-8 right-8 z-20">
        <button
          onClick={handleEnterClick}
          className="px-6 py-3 opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.5)' }}
        >
          Skip
        </button>
      </div>
      {/* Mute/Unmute button, bottom right, transparent, mobile responsive */}
      <button
        onClick={handleMuteToggle}
        className="absolute bottom-8 right-8 z-20 p-3 bg-black bg-opacity-30 hover:bg-opacity-50 transition-colors"
        style={{ color: 'white', border: 'none', outline: 'none' }}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9v6h4l5 5V4l-5 5H9z" />
            <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 5.25L6 9H3.75A.75.75 0 003 9.75v4.5c0 .414.336.75.75.75H6l5.25 3.75V5.25zM16.5 8.25a6 6 0 010 7.5M19.5 6a9 9 0 010 12" />
</svg>

        )}
      </button>
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
