import React from "react";
import "./Movies.css";

const MovieClick = (props) => {
  const movieData = props.movie.fields || props.movie;

  return (
    <div className="movie-click">
      <h4>{movieData.title}</h4>
      <div className="image-container">
        <img
          src={`https://image.tmdb.org/t/p/w200${movieData.poster_path}`}
          alt={movieData.title}
          className="movie-poster"
          onClick={() => props.onMovieClick(movieData)}
        ></img>
        <div className="favourite">
          <button
            className="heart-icon"
            onClick={props.addFavouriteMovie}
            style={{
              color: props.isFavourite ? "red" : "black",
              background: "none",
              border: "none",
            }}
          >
            {props.isFavourite ? "❤️" : "♡"}
          </button>
        </div>
        <div className="watch">
          <button
            className="movie-icon"
            onClick={props.addHistoryMovie}
            style={{
              background: "none",
              border: "none",
            }}
          >
            {props.isHistory ? "👁️" : "🎥"}
          </button>
        </div>
      </div>

      <h5>{movieData.release_date}</h5>
    </div>
  );
};

export default MovieClick;
