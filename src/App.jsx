// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ColorThemeProvider } from './ColorThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Timeline from './components/Timeline';
import Movies from './components/Movies';
import { useState, useRef } from 'react';
import characters from './assets/characters';

function App() {
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
  // inside App function
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
    <ColorThemeProvider>
      <Router>
        <div className="min-h-screen text-white">
          <Navbar
            onHomeClick={scrollToTop}
            onTimelineClick={scrollToTimeline}
            onMoviesClick={scrollToMovies}
            onSearchCharacter={handleSearchCharacter}
          />
          <div className="pt-20">
            <div ref={heroRef} />
            <Routes>
              <Route
                path="/"
                element={
                  <>
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
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
      <footer>Copyright © Shubhang. 2025</footer>
    </ColorThemeProvider>
  );
}

export default App;
