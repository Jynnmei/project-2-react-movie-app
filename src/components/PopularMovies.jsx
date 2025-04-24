import React, { useEffect, useState } from "react";
import "./PopularMovies.css";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`
      );
      const data = await response.json();
      console.log("Data:", data);
      setMovies(data.results);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <div className="popular-movie">
      {movies.map((movie, index) => (
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
  );
};

export default PopularMovies;
