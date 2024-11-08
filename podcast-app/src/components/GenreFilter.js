import React from "react";

const GenreFilter = ({ genres = [], onSelectGenre }) => {
  if (!Array.isArray(genres) || genres.length === 0) {
    return <div>No genres available</div>;
  }

  return (
    <div className="genre-filter">
      <h3>Filter by Genre</h3>
      {genres.map((genre) => {
        // Check if genre object is valid before accessing title
        if (!genre || !genre.title) {
          return null; // Skip invalid genre objects
        }

        return (
          <button key={genre.id} onClick={() => onSelectGenre(genre.id)}>
            {genre.title}
          </button>
        );
      })}
    </div>
  );
};

export default GenreFilter;
