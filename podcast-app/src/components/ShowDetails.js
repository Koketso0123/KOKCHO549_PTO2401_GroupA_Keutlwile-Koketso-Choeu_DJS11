import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { addToFavorites, getFavorites } from "./LocalStorageUtils";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchShowDetails = async () => {
      const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
      const data = await response.json();
      setShow(data);
      setSelectedSeason(data.seasons[0]);
    };

    fetchShowDetails();
  }, [id]);

  const handleFavoriteClick = (episode) => {
    if (!show || !show.title || !selectedSeason) {
      return;
    }
    const timestamp = new Date().toISOString(); // Store the date/time it was added
    const newFavorite = {
      id: episode.id,
      title: episode.title,
      showId: show.id,
      showTitle: show.title,
      seasonTitle: selectedSeason.title,
      timestamp: timestamp,
      episodeFile: episode.file,
    };

    let updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const existingIndex = updatedFavorites.findIndex(
      (fav) => fav.id === episode.id
    );

    if (existingIndex === -1) {
      updatedFavorites.push(newFavorite);
    } else {
      updatedFavorites.splice(existingIndex, 1); // Remove if already favorited
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (!show) return <div>Loading...</div>;

  return (
    <div className="show-details">
      {/* Show the preview image */}
      {show.image && (
        <div className="show-image">
          <img src={show.image} alt={show.title} />
        </div>
      )}

      {/* Show title and description */}
      <h2>{show.title}</h2>
      <p>{show.description}</p>

      {/* Season Selector Dropdown */}
      <div className="season-selector">
        <select
          onChange={(e) => setSelectedSeason(show.seasons[e.target.value])}
        >
          {show.seasons.map((season, index) => (
            <option key={season.id} value={index}>
              {season.title} - {season.episodes.length} Episodes
            </option>
          ))}
        </select>
      </div>

      {selectedSeason &&
        selectedSeason.episodes.map((episode) => (
          <div key={episode.id}>
            <p>{episode.title}</p>
            <audio controls src={episode.file}>
              Your browser does not support the audio element.
            </audio>
            <button onClick={() => handleFavoriteClick(episode)}>
              {favorites.some((fav) => fav.id === episode.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        ))}
    </div>
  );
};

export default ShowDetails;
