import React from 'react';

const Movies = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4" id="movies-section">
      <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Avengers' }}>Movies Section</h2>
      <p className="text-lg text-gray-200 max-w-2xl text-center mb-8">
        Explore the Marvel Cinematic Universe and beyond! Here you can add a list, grid, or gallery of all movies, filter by character, or show movie posters and details. This is a placeholder for your movies content.
      </p>
      {/* Add your movies content here, e.g., a grid of movie posters, search/filter, etc. */}
      <div className="w-full flex flex-wrap justify-center gap-8">
        {/* Example movie poster card */}
        <div className="bg-[#222] rounded-xl shadow-lg p-4 w-48 flex flex-col items-center">
          <img src="/marvel.png" alt="The Avengers" className="w-32 h-44 object-cover rounded mb-2" />
          <span className="text-lg font-semibold mt-2">Marvel</span>
          <span className="text-sm text-gray-400">2002-2019</span>
        </div>
        {/* Add more movie cards here */}
      </div>
        <p className="text-lg text-gray-200 max-w-2xl text-center mb-8">
        We will update this section with list of movies soon!
      </p>
    </section>
  );
};

export default Movies;