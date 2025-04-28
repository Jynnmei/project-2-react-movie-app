import React, { useEffect, useState } from "react";
import "./Movies.css";
import MovieClick from "./MovieClick";
import MoviesModal from "./MoviesModal";

const MovieFavourite = () => {
  const [favourites, setFavourites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
  const baseId = "appQwlxLJ1uNitKKv";
  const favouritesTableName = "addFavorite";
  const favouritesUrl = `https://api.airtable.com/v0/${baseId}/${favouritesTableName}`;

  const getFavourites = async () => {
    try {
      const response = await fetch(favouritesUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFavourites(data.records);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  const handleRemoveFavourite = async (favourite) => {
    try {
      await fetch(`${favouritesUrl}/${favourite.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      setFavourites(favourites.filter((fav) => fav.id !== favourite.id));
      console.log("Removed from favourites!");
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    getFavourites();
  }, []);

  const validFavourites = favourites.filter((movie) => {
    if (!movie.fields) {
      return false;
    }

    const fieldNames = Object.keys(movie.fields);
    if (fieldNames.length === 0) {
      return false;
    }
    return true;
  });

  return (
    <div className="favorites">
      <div className="popular-movie">
        {validFavourites.length > 0 ? (
          validFavourites.map((movie) => (
            <div key={movie.id} className="movie-card">
              <MovieClick
                movie={movie}
                onMovieClick={() => setSelectedMovie(movie)}
                addFavouriteMovie={() => handleRemoveFavourite(movie)}
                isFavourite={true}
              />
            </div>
          ))
        ) : (
          <p>No favourites yet!</p>
        )}
      </div>
      {selectedMovie && (
        <MoviesModal movie={selectedMovie} closeModal={closeModal} />
      )}
    </div>
  );
};

export default MovieFavourite;
