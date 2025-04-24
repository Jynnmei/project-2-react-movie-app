import React, { useEffect, useState } from "react";
import "./Movies.css";
import MoviesSearch from "./MoviesSearch";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [movieFiltered, setMovieFiltered] = useState([]);
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
            <h4>{movie.fields.title}</h4>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.fields["Customize field type"]}`} // 可以换成你真正的图片字段名
              alt={movie.fields.title}
              className="movie-poster"
            />
            <h5>{movie.fields.release_date}</h5>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularMovies;
