import React, { useEffect, useState } from "react";
import "./Movies.css";
import MovieClick from "./MovieClick";
import MoviesModal from "./MoviesModal";

const PopularMovies = (props) => {
  const handleMovieClick = (movie) => {
    console.log("You clicked:", movie.title);
    props.setSelectedMovie(movie);
  };

  const closeModal = () => {
    props.setSelectedMovie(null);
  };

  return (
    <>
      <div className="popular-movie">
        {props.movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <MovieClick
              movie={movie}
              onMovieClick={() => handleMovieClick(movie)}
              addFavouriteMovie={() => props.onAddToFavourite(movie)}
              isFavourite={props.favourites.some(
                (fav) => fav.fields.id === movie.id
              )}
              addHistoryMovie={() => props.onAddToHistory(movie)}
              isHistory={props.historyMovie.some(
                (his) => his.fields.id === movie.id
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
