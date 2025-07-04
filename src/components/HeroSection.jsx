// src/components/HeroSection.jsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterInfo from './CharacterInfo';
import { useColorTheme } from '../ColorThemeContext';

const HeroSection = ({ currentCharacter, setCurrentCharacterIdx, currentCharacterIdx, characters }) => {
  const { setColor } = useColorTheme();

  // Update color theme context when character changes
  useEffect(() => {
    setColor(currentCharacter.bgColor);
  }, [currentCharacter, setColor]);

  // Helper to get prev/next character names
  const getPrevCharacter = () => {
    const prevId = currentCharacter.id === 1 ? characters.length : currentCharacter.id - 1;
    return characters[prevId - 1];
  };
  const getNextCharacter = () => {
    const nextId = currentCharacter.id % characters.length + 1;
    return characters[nextId - 1];
  };
  const getNextNextCharacter = () => {
    const nextId = getNextCharacter().id % characters.length + 1;
    return characters[nextId - 1];
  };

  const handleNextCharacter = () => {
    setCurrentCharacterIdx((currentCharacterIdx + 1) % characters.length);
  };

  const handlePrevCharacter = () => {
    setCurrentCharacterIdx((currentCharacterIdx - 1 + characters.length) % characters.length);
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center md:min-h-[calc(0vh-80px)] px-2 sm:px-4 md:px-20">
      {/* Background Character Names (all three on desktop, only current on mobile hidden) */}
      <div className="hidden sm:flex absolute inset-0 justify-between items-center text-gray-500 opacity-20 text-5xl font-bold uppercase pointer-events-none select-none z-0 w-full">
        <span className="ml-4 text-center w-1/3 truncate leading-tight">{getPrevCharacter().name}</span>
        <span className="text-white drop-shadow-lg w-1/3 text-center opacity-25 leading-tight">{currentCharacter.name}</span>
        <span className="mr-4 text-center w-1/3 truncate leading-tight">{getNextCharacter().name}</span>
      </div>
      {/* Main Content Row: Arrows, Image, Info */}
      <div className="flex flex-col sm:flex-row items-center justify-center w-full z-10 gap-4 sm:gap-0">
        {/* Left Arrow */}
        <div className="hidden sm:flex items-center justify-center w-full sm:w-[5%] h-12 sm:h-full order-1 sm:order-none mb-2 sm:mb-0">
          <button
            onClick={handlePrevCharacter}
            className="flex items-center justify-center w-10 h-10 sm:w-full sm:h-16 bg-white/10 hover:bg-white/20 text-white text-2xl sm:text-3xl rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 z-20 border-none shadow-none backdrop-blur-sm"
            aria-label="Previous character"
            style={{ userSelect: 'none' }}
          >
            <span className="drop-shadow-lg">&#60;</span>
          </button>
        </div>
        {/* Character Image */}
        <div className="flex justify-center w-full sm:w-[40%] max-h-[60vh] sm:max-h-[60vh] md:max-h-[90vh] z-10 order-2 sm:order-2">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentCharacter.id}
              src={currentCharacter.photo}
              alt={currentCharacter.name}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="h-full w-auto max-h-full max-w-full object-contain cursor-grab active:cursor-grabbing"
              loading="lazy"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) {
                  handleNextCharacter();
                } else if (info.offset.x > 100) {
                  handlePrevCharacter();
                }
              }}
            />
          </AnimatePresence>
        </div>
        {/* Character Info */}
        <div className="flex-1 flex justify-center items-center w-full sm:w-[50%] order-3 sm:order-3 mt-6 sm:mt-0">
          <CharacterInfo className="w-full max-w-3xl" character={currentCharacter} />
        </div>
        {/* Right Arrow */}
        <div className="hidden sm:flex items-center justify-center w-full sm:w-[5%] h-12 sm:h-full order-4 mt-2 sm:mt-0">
          <button
            onClick={handleNextCharacter}
            className="flex items-center justify-center w-10 h-10 sm:w-full sm:h-16 bg-white/10 hover:bg-white/20 text-white text-2xl sm:text-3xl rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 z-20 border-none shadow-none backdrop-blur-sm"
            aria-label="Next character"
            style={{ userSelect: 'none' }}
          >
            <span className="drop-shadow-lg">&#62;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;