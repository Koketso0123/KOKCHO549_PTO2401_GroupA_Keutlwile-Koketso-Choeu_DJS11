import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PreviewList = () => {
  const [previews, setPreviews] = useState([]);
  const [genres, setGenres] = useState([]); // State to store genres

  // Fetch previews and genres
  useEffect(() => {
    const fetchPreviews = async () => {
      const response = await fetch("https://podcast-api.netlify.app");
      const data = await response.json();
      const sortedData = data.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically
      setPreviews(sortedData);
    };

    const fetchGenres = async () => {
      const response = await fetch(
        `https://podcast-api.netlify.app/genre/<ID>`
      );
      const data = await response.json();
      setGenres(data);
    };

    fetchPreviews();
    fetchGenres();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown"; // Handle missing or undefined date
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="preview-list">
      {previews.map((preview) => (
        <div key={preview.id} className="preview-card">
          <Link to={`/show/${preview.id}`}>
            {/* Show Image */}
            {preview.image && (
              <div className="preview-image">
                <img src={preview.image} alt={preview.title} />
              </div>
            )}
            <h3>{preview.title}</h3>

            {/* Show number of seasons */}
            <p>{preview.seasons?.length} Seasons</p>

            {/* Last updated date */}
            <p>Last updated: {formatDate(preview.updatedAt)}</p>

            {/* Display genres */}
            <div className="genres">
              {preview.genreIds?.map((genreId) => {
                const genre = genres.find((g) => g.id === genreId); // Find genre by ID
                return genre ? (
                  <span key={genre.id} className="genre-badge">
                    {genre.title}
                  </span>
                ) : null; // Handle case where genre is not found
              })}
            </div>

            <p>{preview.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PreviewList;
