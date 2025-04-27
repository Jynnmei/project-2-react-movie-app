import React from "react";
import MovieFavourite from "../components/MovieFavourite";

const Favorite = () => {
  return (
    <div className="favorites-page">
      <h2>Your Favorite Movies</h2>
      <MovieFavourite />
    </div>
  );
};

export default Favorite;
