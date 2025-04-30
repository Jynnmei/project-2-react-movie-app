import React from "react";
import "./Movies.css";

const MoviesModal = (props) => {
  const movieData = props.movie.fields || props.movie;

  return (
    <div className="movies-modal-overlay">
      <div className="movies-modal">
        <img
          src={`https://image.tmdb.org/t/p/w200${movieData.poster_path}`}
          alt={movieData.title}
          className="movie-poster"
        ></img>
        <div className="text">
          <h3>{movieData.title}</h3>
          <p>{movieData.overview}</p>
          <p>
            Rating: <span>{movieData.vote_average.toFixed(1)}</span>
          </p>
          <p>{movieData.release_date}</p>
          <button onClick={props.closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default MoviesModal;
