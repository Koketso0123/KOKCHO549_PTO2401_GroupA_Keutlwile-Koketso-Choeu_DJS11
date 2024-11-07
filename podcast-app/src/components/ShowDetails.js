import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTimestamp, setCurrentTimestamp] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      setIsLoading(true);
      const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
      const data = await response.json();
      setShow(data);
      setSelectedSeason(data.seasons[0]);
      setIsLoading(false);
    };

    fetchShowDetails();
  }, [id]);

  const handleAudioTimeUpdate = (event) => {
    const timestamp = event.target.currentTime;
    setCurrentTimestamp(timestamp);
    localStorage.setItem(`episode_${id}_timestamp`, timestamp);
  };

  const handleFavoriteClick = (episode) => {
    let updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const existingIndex = updatedFavorites.findIndex(
      (fav) => fav.id === episode.id
    );

    if (existingIndex !== -1) {
      updatedFavorites.splice(existingIndex, 1);
    } else {
      updatedFavorites.push(episode);
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="show-details">
      <h2>{show.title}</h2>
      <p>{show.description}</p>

      <div className="season-selector">
        {show.seasons.map((season) => (
          <button key={season.id} onClick={() => setSelectedSeason(season)}>
            {season.title}
          </button>
        ))}
      </div>

      {selectedSeason &&
        selectedSeason.episodes.map((episode) => (
          <div key={episode.id}>
            <p>{episode.title}</p>
            <audio
              controls
              onTimeUpdate={handleAudioTimeUpdate}
              src={episode.file}
              type="audio/mpeg"
              currentTime={currentTimestamp} // Set the timestamp
            >
              Your browser does not support the audio element.
            </audio>
            <button onClick={() => handleFavoriteClick(episode)}>
              Add to Favorites
            </button>
          </div>
        ))}
    </div>
  );
};

export default ShowDetails;

// }
{
  /* <source src={episode.file} type="audio/mpeg" /> */
  /* the src file must be updated after launching to netlify///////////////////////////////////////////////////////////////////////////////////////////// */
  // Update all srcs and urls after launchind netlify
}
