import React, { useEffect, useState } from "react";
import MoviesSearch from "./MoviesSearch";
import PopularMovies from "./PopularMovies";

const MoviesDisplay = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  //   const [movieFiltered, setMovieFiltered] = useState([]);
  //   const [selectedMovie, setSelectedMovie] = useState(null);

  const baseId = "appQwlxLJ1uNitKKv";
  const tableName = "popularMovies";
  const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
  const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

  const getPopularMovies = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Airtable Data:", data);
      if (data.records) {
        setMovies(data.records);
        setMovieFiltered(data.records);
      } else {
        console.error("Airtable returned no records:", data);
      }
    } catch (err) {
      console.error("Failed to fetch movies:", err);
    }
  };

  //   const handleSearch = (searchTerm) => {
  //     setQuery(searchTerm);
  //     if (!searchTerm) {
  //       setMovieFiltered(movies);
  //       return;
  //     }

  //     const lowercaseQuery = searchTerm.toLowerCase();

  //     const filtered = movies.filter((movie) =>
  //       movie.fields.title.toLowerCase().includes(lowercaseQuery)
  //     );

  //     setMovieFiltered(filtered);
  //   };

  useEffect(() => {
    getPopularMovies();
    // getFavourites();
  }, []);

  //   const handleMovieClick = (movie) => {
  //     console.log("You clicked:", movie.fields.title);
  //     setSelectedMovie(movie);
  //   };

  //   const closeModal = () => {
  //     setSelectedMovie(null);
  //   };

  return (
    <div>
      <MoviesSearch
        value={query}
        onSearch={handleSearch}
        onChange={setQuery}
        placeholder="Search movies"
      />

      <PopularMovies
        movies={movieFiltered}
        handleMovieClick={handleMovieClick}
      />
    </div>
  );
};

export default MoviesDisplay;
