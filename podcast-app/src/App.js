// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreviewList from "./components/PreviewList";
import ShowDetails from "./components/ShowDetails";
import GenreFilter from "./components/GenreFilter";
import AudioPlayer from "./components/AudioPlayer";
import ShowCarousel from "./components/ShowCarousel";
import Fuse from "fuse.js";

const App = () => {
  const [genres, setGenres] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [shows, setShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch("https://podcast-api.netlify.app");
      const data = await response.json();
      const uniqueGenres = [
        ...new Set(data.flatMap((preview) => preview.genreIds)),
      ];
      setGenres(uniqueGenres);
    };

    fetchGenres();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const fuse = new Fuse(shows, {
    keys: ["title", "description"], // Searching by title and description
    threshold: 0.3, // Set the fuzziness level
  });

  const filteredShows = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : shows;

  return (
    <Router>
      <div className="App">
        <h1>Podcast App</h1>
        <GenreFilter genres={genres} onSelectGenre={() => {}} />
        <Routes>
          <Route
            path="/"
            element={<PreviewList setCurrentEpisode={setCurrentEpisode} />}
          />
          <Route
            path="/show/:id"
            element={<ShowDetails setCurrentEpisode={setCurrentEpisode} />}
          />
        </Routes>
        <AudioPlayer currentEpisode={currentEpisode} />{" "}
        {/* Audio player here */}
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Shows by Title"
          value={searchQuery}
          onChange={handleSearch}
        />
        {/* Show Carousel */}
        <ShowCarousel shows={filteredShows.slice(0, 5)} />
      </div>
    </Router>
  );
};

export default App;
