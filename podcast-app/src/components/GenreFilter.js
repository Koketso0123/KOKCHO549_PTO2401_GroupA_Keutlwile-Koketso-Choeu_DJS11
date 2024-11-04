import React from "react";

const GenreFilter = ({ genres, onSelectGenre }) => {
  return (
    <div className="genre-filter">
      <h3>Filter by Genre</h3>
      {genres.map((genre) => (
        <button key={genre.id} onClick={() => onSelectGenre(genre.id)}>
          {genre.title}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
