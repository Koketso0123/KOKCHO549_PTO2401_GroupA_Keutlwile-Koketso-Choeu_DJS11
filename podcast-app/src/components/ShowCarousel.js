import React, { useState } from "react";
import "./ShowCarousel.css"; // Importing the CSS for carousel styles

const ShowCarousel = ({ shows }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < shows.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the first slide
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(shows.length - 1); // Loop back to the last slide
    }
  };

  return (
    <div className="show-carousel">
      <h3>Recommended Shows</h3>
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={prevSlide}>
          &#10094;
        </button>

        <div className="carousel">
          {shows.map((show, index) => (
            <div
              key={show.id}
              className={`carousel-item ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <img src={show.image} alt={show.title} />
              <h4>{show.title}</h4>
            </div>
          ))}
        </div>

        <button className="carousel-button next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ShowCarousel;
