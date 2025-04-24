import React, { useEffect, useState } from "react";
import "./Movies.css";
import MoviesSearch from "./MoviesSearch";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [movieFiltered, setMovieFiltered] = useState([]);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`
      );
      const data = await response.json();
      console.log("Data:", data);
      setMovies(data.results);
      setMovieFiltered(data.results);
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
      movie.title.toLowerCase().includes(lowercaseQuery)
    );

    setMovieFiltered(filtered);
  };

  return (
    <>
      <MoviesSearch
        value={query}
        onSearch={handleSearch}
        onChange={setQuery}
        placeholder="Search movies"
      />
      <div className="popular-movie">
        {movieFiltered.map((movie, index) => (
          <div key={index} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h4>{movie.title}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularMovies;
