import React, { useEffect, useState } from "react";
import "./Movies.css";
import MoviesSearch from "./MoviesSearch";
import MovieClick from "./MovieClick";
import MoviesModal from "./MoviesModal";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [movieFiltered, setMovieFiltered] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favourites, setFavourites] = useState([]);

  const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
  const baseId = "appQwlxLJ1uNitKKv";
  const tableName = "popularMovies";
  const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
  const favouritesTableName = "addFavorite";
  const favouritesUrl = `https://api.airtable.com/v0/${baseId}/${favouritesTableName}`;
  const deleteTableName = "removeFavoriteMovies";
  const deleteUrl = `https://api.airtable.com/v0/${baseId}/${deleteTableName}`;

  const getPopularMovies = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Airtable Data:", data);
      setMovies(data.records);
      setMovieFiltered(data.records);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    if (!searchTerm) {
      setMovieFiltered(movies);
      return;
    }

    const lowercaseQuery = searchTerm.toLowerCase();
    const filtered = movies.filter((movie) =>
      movie.fields.title.toLowerCase().includes(lowercaseQuery)
    );
    setMovieFiltered(filtered);
  };

  const handleAddToFavourite = async (movie) => {
    try {
      const isAlreadyFavourite = favourites.some(
        (fav) => fav.fields.id === movie.fields.id
      );

      if (isAlreadyFavourite) {
        const recordToDelete = favourites.find(
          (fav) => fav.fields.id === movie.fields.id
        );
        const deleteResponse = await fetch(
          `${deleteUrl}/${recordToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        if (deleteResponse.ok) {
          setFavourites(
            favourites.filter((fav) => fav.fields.id !== movie.fields.id)
          );
          console.log("Removed from favourites!");
        }
      } else {
        const postResponse = await fetch(favouritesUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  id: movie.fields.id,
                  title: movie.fields.title,
                  overview: movie.fields.overview,
                  poster_path: movie.fields.poster_path,
                  release_date: movie.fields.release_date,
                  vote_average: movie.fields.vote_average,
                },
              },
            ],
          }),
        });

        if (postResponse.ok) {
          const newFavourite = await postResponse.json();
          setFavourites([...favourites, ...newFavourite.records]);
          console.log("Added to favourites!");
        }
      }
    } catch (error) {
      console.error("Error adding to favourites:", error);
    }
  };

  const handleMovieClick = (movie) => {
    console.log("You clicked:", movie.fields.title);
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    getPopularMovies();
    getFavourites();
  }, []);

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
              addFavouriteMovie={() => handleAddToFavourite(movie)}
              isFavourite={favourites.some(
                (fav) => fav.fields.id === movie.fields.id
              )}
            />
          </div>
        ))}
      </div>
      {selectedMovie && (
        <MoviesModal movie={selectedMovie} closeModal={closeModal} />
      )}
    </>
  );
};

export default PopularMovies;
