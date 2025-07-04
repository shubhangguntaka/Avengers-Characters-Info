// src/components/Timeline.jsx
// Timeline component for character-specific movies
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import characters from '../assets/characters';

// Movie posters mapping (add your images to public/ and map here)
// Prioritize character-specific posters where available, otherwise use a generic.
const moviePosters = {
  'The Avengers': '/movies/the-avengers.jpg',
  'Iron Man': '/movies/iron-man.jpg',
  'Iron Man 2': '/movies/iron-man-2.jpg',
  'Iron Man 3': '/movies/iron-man-3.jpg',
  'Captain America: The First Avenger': '/movies/the-first-avenger.jpg',
  'Captain America: The Winter Soldier': '/movies/the-winter-soldier.jpg',
  'Captain America: Civil War': '/movies/civil-war.jpg',
  'Thor': '/movies/thor.jpg',
  'Thor: The Dark World': '/movies/the-dark-world.jpg',
  'Thor: Ragnarok': '/movies/ragnarok.jpg',
  'The Incredible Hulk': '/movies/the-incredible-hulk.jpg',
  'Hulk': '/movies/hulk.jpg',
  'Black Widow': '/movies/black-widow.jpg',
  'Spider-Man 3': '/movies/spiderman 3.jpg',
  'Spider-Man': '/movies/spiderman.jpg',
  'Spider-Man 2': '/movies/spiderman 3.jpg',
  'The Amazing Spider-Man': '/movies/amazing-spiderman.jpg',
  'The Amazing Spider-Man 2': '/movies/amazing-spiderman-2.jpg',
  'Spider-Man: Homecoming': '/movies/spiderman-homecoming.jpg',
  'Avengers: Age of Ultron': '/movies/age-of-ultron.jpg',
  'Avengers: Infinity War': '/movies/infinity-war.jpg',
  'Avengers: Endgame': '/movies/endgame.jpg',
  'Ant-Man': '/movies/ant-man.jpg',
  'Ant-Man and the Wasp': '/movies/ant-man-and-the-wasp.jpg',
  'Guardians of the Galaxy': '/movies/guardians-of-the-galaxy.jpg',
  'Guardians of the Galaxy Vol. 2': '/movies/guardians-of-the-galaxy-2.jpg',
  'Doctor Strange': '/movies/dr-strange.jpg',
  'Captain Marvel': '/movies/captain-marvel.jpg',
  'Black Panther': '/movies/black-panther.jpg',
  // Specific character posters
  'Captain America 1944':'/movies/captain-america-1944.jpg',
  'Captain America 1979':'/movies/captain-america-1979.jpg',
  'Captain America II: Death Too Soon':'/movies/death-too-soon.jpg',
  'Captain America 1990':'/movies/captain-america-1990.jpg',
  'Hawkeye': '/hawkeye.png',
  'Scarlet Witch': '/scarlet-witch.png',
  'Vision': '/vision.png',
  'War Machine': '/war-machine.png',
  'Falcon': '/falcon.png',
  'Winter Soldier': '/winter-soldier.png',
  'Gamora': '/gamora.png',
  'Nebula': '/nebula.png',
  'Star-Lord': '/star-lord.png',
  'Rocket Raccoon': '/rocket.png',
  'Groot': '/movies/groot.jpg',
  'Drax the Destroyer': '/drax.png',
  'Mantis': '/mantis.png',
  'Okoye': '/okoye.png',
  'Wong': '/wong.png',
  'Valkyrie': '/valkyrie.png',
  'Ancient One': '/ancient-one.png',
  'Nick Fury': '/nick-fury.png',
  'Pepper Potts': '/pepper-potts.png',
  'Thanos': '/thanos.png',
  'Deadpool': '/movies/deadpool.jpg',
  'Deadpool 2': '/movies/deadpool-2.jpg',
  'X-Men Origins: Wolverine': '/movies/wolverine.jpg',
  'Deadpool & Wolverine': '/movies/deadpool-&-wolverine.jpg',
  'Venom': '/movies/venom.jpg',
  'Venom: Let There Be Carnage': '/movies/let-there-be-carnage.jpg',
  'Venom: The Last Dance': '/movies/the-last-dance.jpg',
  'Loki': '/movies/loki.jpg',
  'What If...?': '/movies/what-if.jpg',
};

// Character movie timeline data (character name => { beforeMCU: [], mcu: [] })
const characterMovieTimeline = {
  'Iron Man': {
    beforeMCU: [],
    mcu: [
      { title: 'Iron Man', year: 2008 },
      { title: 'Iron Man 2', year: 2010 },
      { title: 'The Avengers', year: 2012 },
      { title: 'Iron Man 3', year: 2013 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Spider-Man: Homecoming', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Captain America': {
    beforeMCU: [
      { title: 'Captain America 1944', year: 1944, note: 'Serial film' },
      { title: 'Captain America 1979', year: 1979, note: 'TV film' },
      { title: 'Captain America II: Death Too Soon', year: 1979, note: 'TV film' },
      { title: 'Captain America 1990', year: 1990 },
    ],
    mcu: [
      { title: 'Captain America: The First Avenger', year: 2011 },
      { title: 'The Avengers', year: 2012 },
      { title: 'Captain America: The Winter Soldier', year: 2014 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Thor': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor', year: 2011 },
      { title: 'The Avengers', year: 2012 },
      { title: 'Thor: The Dark World', year: 2013 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Thor: Ragnarok', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Hulk': {
    beforeMCU: [
      { title: 'Hulk', year: 2003, note: 'Ang Lee film' },
    ],
    mcu: [
      { title: 'The Incredible Hulk', year: 2008 },
      { title: 'The Avengers', year: 2012, note: 'Mark Ruffalo takes over' },
      { title: 'Iron Man 3', year: 2013, note: 'Post-credits cameo' },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Thor: Ragnarok', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Black Widow': {
    beforeMCU: [],
    mcu: [
      { title: 'Iron Man 2', year: 2010 },
      { title: 'The Avengers', year: 2012 },
      { title: 'Captain America: The Winter Soldier', year: 2014 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
      { title: 'Black Widow', year: 2021, note: 'Set before Endgame' },
    ],
  },
  'Hawkeye': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor', year: 2011, note: 'Cameo' },
      { title: 'The Avengers', year: 2012 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Scarlet Witch': {
    beforeMCU: [],
    mcu: [
      { title: 'Captain America: The Winter Soldier', year: 2014, note: 'Post-credits cameo' },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Vision': {
    beforeMCU: [],
    mcu: [
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
    ],
  },
  'Captain Marvel': {
    beforeMCU: [],
    mcu: [
      { title: 'Captain Marvel', year: 2019, note: 'Set in 1995' },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Doctor Strange': {
    beforeMCU: [],
    mcu: [
      { title: 'Doctor Strange', year: 2016 },
      { title: 'Thor: Ragnarok', year: 2017, note: 'Mid-credits scene' },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Black Panther': {
    beforeMCU: [],
    mcu: [
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Black Panther', year: 2018 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Spider-Man': {
    beforeMCU: [
      { title: 'Spider-Man', year: 2002, note: 'Tobey Maguire' },
      { title: 'Spider-Man 2', year: 2004, note: 'Tobey Maguire' },
      { title: 'Spider-Man 3', year: 2007, note: 'Tobey Maguire' },
      { title: 'The Amazing Spider-Man', year: 2012, note: 'Andrew Garfield' },
      { title: 'The Amazing Spider-Man 2', year: 2014, note: 'Andrew Garfield' },
    ],
    mcu: [
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Spider-Man: Homecoming', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Ant-Man': {
    beforeMCU: [],
    mcu: [
      { title: 'Ant-Man', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Ant-Man and the Wasp', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'War Machine': {
    beforeMCU: [],
    mcu: [
      { title: 'Iron Man', year: 2008, note: 'As James Rhodes (Terrence Howard)' },
      { title: 'Iron Man 2', year: 2010, note: 'As War Machine (Don Cheadle)' },
      { title: 'Iron Man 3', year: 2013 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Falcon': {
    beforeMCU: [],
    mcu: [
      { title: 'Captain America: The Winter Soldier', year: 2014 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Ant-Man', year: 2015, note: 'Cameo' },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Winter Soldier': {
    beforeMCU: [],
    mcu: [
      { title: 'Captain America: The First Avenger', year: 2011, note: 'As Bucky Barnes' },
      { title: 'Captain America: The Winter Soldier', year: 2014 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Black Panther', year: 2018, note: 'Post-credits scene' },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Gamora': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019, note: 'Past version' },
    ],
  },
  'Nebula': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Star-Lord': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Rocket Raccoon': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Groot': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017, note: 'As Baby Groot' },
      { title: 'Avengers: Infinity War', year: 2018, note: 'As Teen Groot' },
      { title: 'Avengers: Endgame', year: 2019, note: 'As Teen Groot' },
    ],
  },
  'Drax the Destroyer': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Mantis': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Okoye': {
    beforeMCU: [],
    mcu: [
      { title: 'Black Panther', year: 2018 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Wong': {
    beforeMCU: [],
    mcu: [
      { title: 'Doctor Strange', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Valkyrie': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor: Ragnarok', year: 2017 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Ancient One': {
    beforeMCU: [],
    mcu: [
      { title: 'Doctor Strange', year: 2016 },
      { title: 'Avengers: Endgame', year: 2019, note: 'Via time travel' },
    ],
  },
  'Nick Fury': {
    beforeMCU: [],
    mcu: [
      { title: 'Iron Man', year: 2008, note: 'Post-credits cameo' },
      { title: 'Iron Man 2', year: 2010 },
      { title: 'Thor', year: 2011, note: 'Post-credits cameo' },
      { title: 'Captain America: The First Avenger', year: 2011, note: 'Post-credits cameo' },
      { title: 'The Avengers', year: 2012 },
      { title: 'Captain America: The Winter Soldier', year: 2014 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Avengers: Infinity War', year: 2018, note: 'Post-credits scene' },
      { title: 'Captain Marvel', year: 2019, note: 'Set in 1995' },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Pepper Potts': {
    beforeMCU: [],
    mcu: [
      { title: 'Iron Man', year: 2008 },
      { title: 'Iron Man 2', year: 2010 },
      { title: 'The Avengers', year: 2012 },
      { title: 'Iron Man 3', year: 2013 },
      { title: 'Avengers: Age of Ultron', year: 2015, note: 'Cameo' },
      { title: 'Captain America: Civil War', year: 2016, note: 'Cameo' },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Thanos': {
    beforeMCU: [],
    mcu: [
      { title: 'The Avengers', year: 2012, note: 'Mid-credits cameo' },
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Avengers: Age of Ultron', year: 2015, note: 'Mid-credits cameo' },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Deadpool': {
    beforeMCU: [
      { title: 'X-Men Origins: Wolverine', year: 2009, note: 'First live-action appearance' },
      { title: 'Deadpool', year: 2016 },
      { title: 'Deadpool 2', year: 2018 },
    ],
    mcu: [
      { title: 'Deadpool & Wolverine', year: 2024, note: 'Upcoming MCU debut' },
    ],
  },
  'Venom': {
    beforeMCU: [
      { title: 'Spider-Man 3', year: 2007, note: 'First live-action appearance (Eddie Brock)' },
      { title: 'Venom', year: 2018, note: 'Sony\'s Spider-Man Universe' },
      { title: 'Venom: Let There Be Carnage', year: 2021, note: 'Sony\'s Spider-Man Universe' },
      { title: 'Venom: The Last Dance', year: 2024, note: 'Sony\'s Spider-Man Universe, upcoming' },
    ],
    mcu: [
      { title: 'Spider-Man: No Way Home', year: 2021, note: 'Mid-credits scene cameo, temporarily in MCU' },
    ],
  },
  'Loki': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor', year: 2011 },
      { title: 'The Avengers', year: 2012 },
      { title: 'Thor: The Dark World', year: 2013 },
      { title: 'Thor: Ragnarok', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019, note: 'Alternate timeline Loki escapes with Tesseract' },
      { title: 'Loki', year: 2021, note: 'Disney+ series, TVA adventures' },
    ],
  },
  'Hela': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor: Ragnarok', year: 2017, note: 'Main antagonist' },
    ],
  },
  'Ultron': {
    beforeMCU: [],
    mcu: [
      { title: 'Avengers: Age of Ultron', year: 2015, note: 'Main antagonist' },
      { title: 'What If...?', year: 2021, note: 'Alternate versions in animated series' },
    ],
  },
};

// Add short MCU event/role for each movie (optional, can be expanded)
const movieEvents = {
  'The Avengers': 'Avengers assemble for the first time.',
  'Iron Man': 'Tony Stark builds the Iron Man suit.',
  'Iron Man 2': 'Tony battles Vanko and government pressure.',
  'Iron Man 3': 'Tony faces PTSD and a new enemy.',
  'Avengers: Age of Ultron': 'Ultron threatens Earth, Avengers create Vision.',
  'Captain America: Civil War': 'Avengers split over Sokovia Accords.',
  'Spider-Man: Homecoming': 'Peter balances high school and hero life.',
  'Avengers: Infinity War': 'Thanos collects the Infinity Stones.',
  'Avengers: Endgame': 'Final battle against Thanos, heroes restore half of all life.',
  'Captain America: The First Avenger': 'Steve Rogers becomes a super-soldier in WWII.',
  'Captain America: The Winter Soldier': 'Hydra is revealed inside S.H.I.E.L.D.',
  'Thor': 'Thor is banished to Earth and learns humility.',
  'Thor: The Dark World': 'Dark Elves seek the Aether, Thor protects Jane.',
  'Thor: Ragnarok': 'Asgard faces Ragnarok, Thor battles Hela.',
  'The Incredible Hulk': 'Bruce Banner battles his inner monster and General Ross.',
  'Hulk': 'Bruce Banner’s origin story and first transformation.',
  'Black Panther': 'T’Challa becomes King of Wakanda.',
  'Ant-Man': 'Scott Lang becomes Ant-Man for the first time.',
  'Ant-Man and the Wasp': 'Scott and Hope search for Janet van Dyne.',
  'Guardians of the Galaxy': 'A group of cosmic misfits unite to save Xandar.',
  'Guardians of the Galaxy Vol. 2': 'Peter meets his celestial father, Ego.',
  'Doctor Strange': 'Stephen Strange learns the mystic arts to heal his hands.',
  'Captain Marvel': 'Carol Danvers discovers her true Kree identity and powers.',
  'Black Widow': 'Natasha confronts her past in Russia.',
  'Hawkeye': 'Clint trains Kate Bishop after the blip.',
  'Scarlet Witch': 'Wanda’s powers are enhanced by the Mind Stone.',
  'Vision': 'Vision is created, becoming a powerful Avenger.',
  'War Machine': 'Rhodey aids Iron Man in his armored suit.',
  'Falcon': 'Sam Wilson becomes Captain America\'s trusted ally.',
  'Winter Soldier': 'Bucky Barnes is revealed as a HYDRA assassin.',
  'Gamora': 'Gamora attempts to escape Thanos\'s influence.',
  'Nebula': 'Nebula confronts her abusive past with Thanos and Gamora.',
  'Star-Lord': 'Peter Quill leads the Guardians, discovering his heritage.',
  'Rocket Raccoon': 'Rocket showcases his genius with tech and weapons.',
  'Groot': 'Groot sacrifices himself to save his friends, later reborn.',
  'Drax the Destroyer': 'Drax seeks vengeance for his family against Ronan and Thanos.',
  'Mantis': 'Mantis joins the Guardians, using her empathic abilities.',
  'Okoye': 'Okoye serves as General of the Dora Milaje, fiercely loyal to Wakanda.',
  'Wong': 'Wong serves as the librarian of Kamar-Taj and aide to Doctor Strange.',
  'Valkyrie': 'Brunnhilde, a former Asgardian warrior, helps Thor save her people.',
  'Ancient One': 'The wise Sorcerer Supreme mentors Stephen Strange.',
  'Nick Fury': 'Fury initiates the Avengers Initiative.',
  'Pepper Potts': 'Pepper manages Stark Industries, later dons the Rescue armor.',
  'Thanos': 'The Mad Titan aims to balance the universe by wiping out half of all life.',
  'X-Men Origins: Wolverine': 'Wade Wilson is introduced as a mercenary with powers.',
  'Deadpool': 'Wade Wilson undergoes experiments, gaining healing powers and a dark humor.',
  'Deadpool 2': 'Deadpool forms X-Force to protect a young mutant.',
  'Deadpool & Wolverine': 'Deadpool navigates the MCU with Wolverine.',
  'Venom': 'Eddie Brock bonds with an alien symbiote, becoming Venom.',
  'Venom: Let There Be Carnage': 'Eddie and Venom face off against Carnage.',
  'Venom: The Last Dance': 'Eddie and Venom are on the run from both humans and aliens.',
  'Spider-Man 3': 'Peter Parker deals with new villains, including Eddie Brock as Venom.',
  'Spider-Man: No Way Home': 'Spider-Man encounters characters from other universes.',
};


const Timeline = ({ character }) => {
  // const [altDesign, setAltDesign] = useState(false); // This state isn't used, can remove or implement functionality
  
  // Get timeline data for the character
  const timelineData = characterMovieTimeline[character.name] || { beforeMCU: [], mcu: [] };
  const beforeMCUMovies = timelineData.beforeMCU || [];
  const mcuMovies = timelineData.mcu || [];
  const color = character.bgColor || '#2A1B5E';
  const fontFamily = character.fontFamily || 'Avengers';

  // Helper function to render a movie entry
  const renderMovieEntry = (movie, isLeft, index, sectionType) => (
    <motion.div
      key={`${movie.title}-${movie.year}-${sectionType}-${index}`} // More robust key
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`w-full flex justify-between items-center mb-10 relative ${sectionType === 'mcu' ? 'lg:mb-16' : ''}`}
      style={{ minHeight: '120px' }}
    >
      {isLeft ? (
        <div className="flex flex-row-reverse items-center gap-4 md:gap-6 max-w-[45%] text-right pr-2 md:pr-4 z-10">
          <div className="flex flex-col items-center w-full">
            <img
              src={moviePosters[movie.title] || '/avengers.png'}
              alt={movie.title}
              className="w-auto h-auto md:w-auto md:h-auto object-cover rounded-xl shadow-md border-2 border-white mb-2"
              style={{ background: '#fff' }}
            />
            <div className="flex flex-col items-center w-full">
              <span className="text-lg md:text-xl font-semibold" style={{ fontFamily }}>{movie.title}</span>
              <span className="text-base text-gray-500 mb-1">{movie.year}</span>
              {movieEvents[movie.title] && (
                <span className="text-xs md:text-sm text-gray-700 italic">{movieEvents[movie.title]}</span>
              )}
              {movie.note && <span className="text-xs text-gray-600 italic mt-1 font-medium">{movie.note}</span>}
            </div>
          </div>
        </div>
      ) : <div className="max-w-[45%]"></div>}

      <span
        className="absolute left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full border-4 border-white shadow-lg z-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ background: sectionType === 'mcu' ? color : '#bbb', borderColor: '#fff', boxShadow: `0 0 0 ${sectionType === 'mcu' ? '6px' : '4px'} ${sectionType === 'mcu' ? color + '33' : '#bbb3'}, 0 2px 8px #0002`, transition: 'background 0.6s cubic-bezier(0.4,0,0.2,1), box-shadow 0.6s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <span className="block w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></span>
      </span>

      {!isLeft ? (
        <div className="flex flex-row items-center gap-4 md:gap-6 max-w-[45%] text-left pl-2 md:pl-4 z-10">
          <div className="flex flex-col items-center w-full">
            <img
              src={moviePosters[movie.title] || '/avengers.png'}
              alt={movie.title}
              className="w-auto h-auto md:w-auto md:h-auto object-cover rounded-xl shadow-md border-2 border-white mb-2"
              style={{ background: '#fff' }}
            />
            <div className="flex flex-col items-center w-full">
              <span className="text-lg md:text-xl font-semibold" style={{ fontFamily }}>{movie.title}</span>
              <span className="text-base text-gray-500 mb-1">{movie.year}</span>
              {movieEvents[movie.title] && (
                <span className="text-xs md:text-sm text-gray-700 italic">{movieEvents[movie.title]}</span>
              )}
              {movie.note && <span className="text-xs text-gray-600 italic mt-1 font-medium">{movie.note}</span>}
            </div>
          </div>
        </div>
      ) : <div className="max-w-[45%]"></div>}
    </motion.div>
  );

  return (
    <section className="w-full flex justify-center py-6 px-2 md:px-10">
      <div className="w-full max-w-3xl relative">
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-center" style={{ fontFamily }}>{character.name} Timeline</h1>
        </div>

        {/* Centered vertical timeline */}
        <div className="relative flex flex-col items-center mt-8" style={{ minHeight: '100px' }}>
          {/* Vertical line centered absolutely */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-1 bg-gray-300 z-0" style={{ minHeight: '100%' }}></div>

          {/* Before MCU section */}
          {beforeMCUMovies.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-6 mt-4" style={{ fontFamily, color: '#666', transition: 'color 0.6s cubic-bezier(0.4,0,0.2,1)' }}>Before MCU</h2>
              {beforeMCUMovies.map((movie, idx) => {
                const isLeft = idx % 2 === 0;
                return renderMovieEntry(movie, isLeft, idx, 'beforeMCU');
              })}
              <hr className="w-1/2 border-t-2 border-gray-400 my-8" /> {/* Separator */}
            </>
          )}

          {/* MCU section */}
          {mcuMovies.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-6 mt-4" style={{ fontFamily, color, transition: 'color 0.6s cubic-bezier(0.4,0,0.2,1)' }}>MCU Appearances</h2>
              {mcuMovies.map((movie, idx) => {
                const isLeft = idx % 2 === 0;
                return renderMovieEntry(movie, isLeft, idx, 'mcu');
              })}
            </>
          ) : beforeMCUMovies.length === 0 ? (
            <div className="text-center text-lg font-medium text-gray-500 mt-8">
              No cinematic appearances recorded for this character.
            </div>
          ) : null /* If there are beforeMCU movies but no MCU, the "Before MCU" title will suffice */}
        </div>
      </div>
    </section>
  );
};

export default Timeline;