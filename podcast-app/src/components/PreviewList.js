import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { addToFavorites, removeFromFavorites, getFavorites, resetFavorites } from "./LocalStorageUtils";

const PreviewList = () => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const fetchPreviews = async () => {
      const response = await fetch("https://podcast-api.netlify.app");
      const data = await response.json();
      const sortedData = data.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically
      setPreviews(sortedData);
    };

    fetchPreviews();
  }, []);

  return (
    <div className="preview-list">
      {previews.map((preview) => (
        <div key={preview.id} className="preview-card">
          <Link to={`/show/${preview.id}`}>
            <img src={preview.image} alt={preview.title} />
            <h3>{preview.title}</h3>
            <p>{preview.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PreviewList;
