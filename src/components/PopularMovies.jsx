import React, { useEffect, useState } from "react";
import "./Movies.css";
import MoviesSearch from "./MoviesSearch";
import MovieClick from "./MovieClick";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [query, setQuery] = useState("");
  const [movieFiltered, setMovieFiltered] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const url = "https://api.airtable.com/v0/appQwlxLJ1uNitKKv/Imported%20table";
  const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

  const getPopularMovies = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const data = await response.json();
      console.log("Airtable Data:", data);
      setMovies(data.records);
      setMovieFiltered(data.records);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    if (!searchTerm) {
      setMovieFiltered(movies);
      return;
    }

    const lowercaseQuery = searchTerm.toLowerCase();

    const filtered = movies.filter((movie) =>
      movie.fields.title.toLowerCase().includes(lowercaseQuery)
    );

    setMovieFiltered(filtered);
  };

  const addFavouriteMovie = (movie) => {
    console.log("Added to favourites:", movie.fields.title);
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  };

  const handleMovieClick = (movie) => {
    console.log("You clicked:", movie.fields.title);
    setSelectedMovie(movie);
  };

  useEffect(() => {
    if (selectedMovie) {
      console.log("Selected movie changed:", selectedMovie.fields.title);
    }
  }, [selectedMovie]);

  return (
    <>
      <MoviesSearch
        value={query}
        onSearch={handleSearch}
        onChange={setQuery}
        placeholder="Search movies"
      />
      <div className="popular-movie">
        {movieFiltered.map((movie) => (
          <div key={movie.id} className="movie-card">
            <MovieClick
              movie={movie}
              onMovieClick={() => handleMovieClick(movie)}
              addFavouriteMovie={addFavouriteMovie}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularMovies;
