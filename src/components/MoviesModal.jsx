import React from "react";
import "./Movies.css";

const MoviesModal = (props) => {
  return (
    <div className="movies-modal-overlay">
      <div className="movies-modal">
        <img
          src={`https://image.tmdb.org/t/p/w200${props.movie.fields.poster_path}`}
          alt={props.movie.fields.title}
          className="movie-poster"
        ></img>
        <div className="text">
          <h3>{props.movie.fields.title}</h3>
          <p>{props.movie.fields.overview}</p>
          <p>
            Rating: <span>{props.movie.fields.vote_average.toFixed(1)}</span>
          </p>
          <p>{props.movie.fields.release_date}</p>
          <button onClick={props.closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default MoviesModal;
