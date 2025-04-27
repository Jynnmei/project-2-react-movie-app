import React, { useEffect, useState } from "react";
import "./Movies.css";
import MoviesSearch from "./MoviesSearch";
import MovieClick from "./MovieClick";
import MoviesModal from "./MoviesModal";

const PopularMovies = (props) => {
  const [query, setQuery] = useState("");
  const [movieFiltered, setMovieFiltered] = useState(props.movies);

  useEffect(() => {
    setMovieFiltered(props.movies);
  }, [props.movies]);

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    if (!searchTerm) {
      setMovieFiltered(props.movies);
      return;
    }

    const lowercaseQuery = searchTerm.toLowerCase();
    const filtered = props.movies.filter((movie) =>
      movie.fields.title.toLowerCase().includes(lowercaseQuery)
    );
    setMovieFiltered(filtered);
  };

  const handleMovieClick = (movie) => {
    console.log("You clicked:", movie.fields.title);
    props.setSelectedMovie(movie);
  };

  const closeModal = () => {
    props.setSelectedMovie(null);
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
        {movieFiltered.map((movie) => (
          <div key={movie.id} className="movie-card">
            <MovieClick
              movie={movie}
              onMovieClick={() => handleMovieClick(movie)}
              addFavouriteMovie={() => props.onAddToFavourite(movie)}
              isFavourite={props.favourites.some(
                (fav) => fav.fields.id === movie.fields.id
              )}
            />
          </div>
        ))}
      </div>
      {props.selectedMovie && (
        <MoviesModal movie={props.selectedMovie} closeModal={closeModal} />
      )}
    </>
  );
};

export default PopularMovies;
