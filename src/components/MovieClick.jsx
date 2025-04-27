import React from "react";
import "./Movies.css";

const MovieClick = (props) => {
  return (
    <div className="movie-click">
      <h4>{props.movie.fields.title}</h4>
      <div className="image-container">
        <img
          src={`https://image.tmdb.org/t/p/w200${props.movie.fields.poster_path}`}
          alt={props.movie.fields.title}
          className="movie-poster"
          onClick={() => props.onMovieClick(props.movie)}
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
      </div>

      <h5>{props.movie.fields.release_date}</h5>
    </div>
  );
};

export default MovieClick;
