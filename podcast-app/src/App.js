import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShowDetails from "./components/ShowDetails";
import PreviewList from "./components/PreviewList";
import Favorites from "./components/Favorite";
import GenreFilter from "./components/GenreFilter";

const App = () => {
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // useEffect(() => {
  //   const fetchShows = async () => {
  //     const response = await fetch("https://podcast-api.netlify.app");
  //     const data = await response.json();
  //     setShows(data);
  //   };

  //   const fetchGenres = async () => {
  //     const response = await fetch("https://podcast-api.netlify.app/genres");
  //     const data = await response.json();
  //     setGenres(data);
  //   };

  //   fetchShows();
  //   fetchGenres();
  // }, []);

  const fetchGenres = async () => {
    const response = await fetch("https://podcast-api.netlify.app/genres");
    const data = await response.json();
    setGenres(data);
  };

  // Fetch shows (Assuming you have a function to fetch shows based on genre)
  const fetchShows = async () => {
    const response = await fetch("https://podcast-api.netlify.app/shows");
    const data = await response.json();
    setShows(data);
  };

  useEffect(() => {
    fetchShows();
    fetchGenres();
  }, []);

  // Handle genre selection
  const handleSelectGenre = (genreId) => {
    setSelectedGenre(genreId);
  };

  // Filter shows based on the selected genre
  const filteredShows = selectedGenre
    ? shows.filter(
        (show) => show.genres.includes(selectedGenre) // Assuming show has a genres array
      )
    : shows;

  return (
    <Router>
      <div className="App">
        <h1>Podcast App</h1>
        {/* Navigation Link to Favorites */}
        <nav>
          <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
        </nav>

        {/* Genre Filter */}
        <GenreFilter
          genres={genres}
          onSelectGenre={handleSelectGenre}
          selectedGenre={selectedGenre}
        />

        <Routes>
          <Route path="/" element={<PreviewList shows={shows} />} />
          <Route path="/show/:id" element={<ShowDetails />} />
          <Route path="/favorites" element={<Favorites />} />{" "}
          {/* Favorites Page Route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
