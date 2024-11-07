// Favorites.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  //   Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Remove episode from favorites
  const handleRemoveFavorite = (episodeId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== episodeId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Sort favorites by title (A-Z / Z-A)
  const sortFavoritesByTitle = (order) => {
    const sortedFavorites = [...favorites].sort((a, b) =>
      order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    setFavorites(sortedFavorites);
  };

  // Sort favorites by date (newest / oldest)
  const sortFavoritesByDate = (order) => {
    const sortedFavorites = [...favorites].sort((a, b) =>
      order === "newest"
        ? new Date(b.timestamp) - new Date(a.timestamp)
        : new Date(a.timestamp) - new Date(b.timestamp)
    );
    setFavorites(sortedFavorites);
  };

  return (
    <div className="favorites-page">
      <h2>Your Favorite Episodes</h2>
      <div className="sort-options">
        <button onClick={() => sortFavoritesByTitle("asc")}>
          Sort by Title A-Z
        </button>
        <button onClick={() => sortFavoritesByTitle("desc")}>
          Sort by Title Z-A
        </button>
        <button onClick={() => sortFavoritesByDate("newest")}>
          Sort by Newest
        </button>
        <button onClick={() => sortFavoritesByDate("oldest")}>
          Sort by Oldest
        </button>
      </div>

      {favorites.length > 0 ? (
        favorites.map((fav) => (
          <div key={fav.id} className="favorite-item">
            <h4>{fav.title}</h4>
            <p>
              {fav.seasonTitle} - Show:{fav.showTitle}
            </p>
            <p>Added on: {new Date(fav.timestamp).toLocaleString()}</p>
            <button onClick={() => handleRemoveFavorite(fav.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No favorites added yet!</p>
      )}
    </div>
  );
};
export default Favorites;
