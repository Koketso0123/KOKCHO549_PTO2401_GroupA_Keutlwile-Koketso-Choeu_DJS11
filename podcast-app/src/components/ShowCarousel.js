import React from "react";

const ShowCarousel = ({ shows }) => {
  return (
    <div className="show-carousel">
      <h3>Recommended Shows</h3>
      <div className="carousel">
        {shows.map((show) => (
          <div key={show.id} className="carousel-item">
            <img src={show.image} alt={show.title} />
            <h4>{show.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowCarousel;
