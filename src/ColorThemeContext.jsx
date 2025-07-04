// src/ColorThemeContext.jsx
import { createContext, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ColorThemeContext = createContext();

export function useColorTheme() {
  return useContext(ColorThemeContext);
}

export function ColorThemeProvider({ children, initialColor = '#2A1B5E' }) {
  const [color, setColor] = useState(initialColor);

  return (
    <ColorThemeContext.Provider value={{ color, setColor }}>
      {/* Animate background color for the whole app */}
      <motion.div
        animate={{ backgroundColor: color }}
        transition={{ duration: 0.6 }}
        style={{ minHeight: '100vh', width: '100vw' }}
      >
        {children}
      </motion.div>
    </ColorThemeContext.Provider>
  );
}
