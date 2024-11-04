import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PreviewList from "./components/PreviewList";
import ShowDetails from "./components/ShowDetails";
import GenreFilter from "./components/GenreFilter";

const App = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch("https://podcast-api.netlify.app");
      const data = await response.json();
      // Assuming you extract genres from the data here
      const uniqueGenres = [
        ...new Set(data.flatMap((preview) => preview.genreIds)),
      ]; // Adjust as necessary
      setGenres(uniqueGenres);
    };

    fetchGenres();
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Podcast App</h1>
        <GenreFilter genres={genres} onSelectGenre={() => {}} />
        <Switch>
          <Route path="/" exact component={PreviewList} />
          <Route path="/show/:id" component={ShowDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
