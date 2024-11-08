import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PreviewList = () => {
  const [previews, setPreviews] = useState([]);
  const [genres, setGenres] = useState([]); // State to store genres

  // Fetch previews and genres
  useEffect(() => {
    const fetchPreviews = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app");
        if (!response.ok) {
          throw new Error("Failed to fetch previews");
        }
        const data = await response.json();
        console.log("Fetched Previews:", data);
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPreviews(sortedData);
      } catch (error) {
        console.error("Error fetching previews:", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app/genres");
        // ;
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await response.json();
        console.log("Fetched Genres:", data);
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchPreviews();
    fetchGenres();
  }, []);

  return (
    <div className="preview-list">
      {previews.map((preview) => {
        return (
          <div key={preview.id} className="preview-card">
            <Link to={`/show/${preview.id}`}>
              {/* Show Image */}
              {preview.image && (
                <div className="preview-image">
                  <img src={preview.image} alt={preview.title} />
                </div>
              )}
              <h3
                style={{
                  color: "goldenrod",
                }}
              >
                {preview.title}
              </h3>

              {/* // Show number of seasons */}
              <p>Seasons: {preview.seasons} </p>

              {/* Last updated date */}
              <p>
                Last updated: {preview.updated}
                {/* {formatDate(preview.updatedAt)} */}
              </p>

              <p>Genre: {preview.genres}</p>
              <p>{preview.description}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewList;
