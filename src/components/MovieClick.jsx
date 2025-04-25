import React from "react";
import "./Movies.css";
import AddFavourite from "./AddFavourite";

const MovieClick = (props) => {
  return (
    <div
      className="movie-click"
      onClick={() => props.onMovieClick(props.movie)}
    >
      <h4>{props.movie.fields.title}</h4>
      <div className="image-container">
        <img
          src={`https://image.tmdb.org/t/p/w200${props.movie.fields["Customize field type"]}`}
          alt={props.movie.fields.title}
          className="movie-poster"
        ></img>
        <div className="favourite">
          <AddFavourite
            handleFavouritesClick={() => props.addFavouriteMovie(props.movie)}
          />
        </div>
      </div>
      <h5>{props.movie.fields.release_date}</h5>
    </div>
  );
};

export default MovieClick;
