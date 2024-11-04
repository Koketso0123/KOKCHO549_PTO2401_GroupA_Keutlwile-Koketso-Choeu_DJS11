import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
      const data = await response.json();
      setShow(data);
    };

    fetchShowDetails();
  }, [id]);

  if (!show) return <div>Loading...</div>;

  return (
    <div className="show-details">
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      {show.seasons.map((season) => (
        <div key={season.id}>
          <h3>{season.title}</h3>
          {season.episodes.map((episode) => (
            <div key={episode.id}>
              <p>{episode.title}</p>
              <audio controls>
                <source src={episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ShowDetails;
