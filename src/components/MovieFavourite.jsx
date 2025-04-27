import React, { useEffect, useState } from "react";

const MovieFavourite = () => {
  const [favourites, setFavourites] = useState([]);

  const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
  const baseId = "appQwlxLJ1uNitKKv";
  const favouritesTableName = "addFavorite";
  const favouritesUrl = `https://api.airtable.com/v0/${baseId}/${favouritesTableName}`;

  const getFavourites = async () => {
    try {
      const response = await fetch(favouritesUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
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
        },
      });

      setFavourites(favourites.filter((fav) => fav.id !== favourite.id));
      console.log("Removed from favourites!");
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <div>
      <h1>My Favourite Movies</h1>
      <ul>
        {favourites.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.fields.title}</h3>
            <p>{movie.fields.release_date}</p>
            <button onClick={() => handleRemoveFavourite(movie)}>
              ❤️ Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieFavourite;
