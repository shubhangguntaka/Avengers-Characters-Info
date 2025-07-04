// src/components/CharacterInfo.jsx
import { motion } from 'framer-motion';

const CharacterInfo = ({ character }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full md:w-1/2 space-y-4"
    >
      <h1
        className="text-5xl md:text-6xl font-bold uppercase leading-tight"
        style={{ fontFamily: character.fontFamily}}
      >
        {character.name}
      </h1>
      {character.originalName && (
        <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-2" style={{ fontSize: '1.2rem' }}>
          <span className="text-base md:text-lg font-normal text-gray-400 block" style={{ fontFamily: character.fontFamily}}>{character.originalName}</span>
        </h2>
      )}
      <p className="text-gray-200 text-sm max-w-md leading-relaxed">{character.description}</p>
      {character.powers && (
        <div className="text-gray-300 text-sm mt-2">
          <span className="font-semibold text-gray-400">Powers: </span>{character.powers}
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-2 text-xs text-gray-400 mt-2">
        {character.birth && (
          <span><span className="font-semibold">Birth:</span> {character.birth}</span>
        )}
        {character.death && (
          <span><span className="font-semibold">Death:</span> {character.death}</span>
        )}
      </div>
      <a href="#" className="inline-block text-white border-b-2 border-white pb-1 uppercase text-sm tracking-widest hover:text-gray-300">
        Read More
      </a>
    </motion.div>
  );
};

export default CharacterInfo;