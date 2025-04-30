import React, { useEffect, useState } from "react";
import PopularMovies from "../components/PopularMovies.jsx";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [historyMovie, setHistoryMovie] = useState([]);

  const apiTMDBKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
  const baseId = "appQwlxLJ1uNitKKv";
  const favouritesTableName = "addFavorite";
  const favouritesUrl = `https://api.airtable.com/v0/${baseId}/${favouritesTableName}`;
  const historyTableName = "historyMovies";
  const historyUrl = `https://api.airtable.com/v0/${baseId}/${historyTableName}`;

  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiTMDBKey}`
      );
      const data = await response.json();
      console.log("Data:", data);
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleAddToFavourite = async (movie) => {
    try {
      const isAlreadyFavourite = favourites.some(
        (fav) => fav.fields.id === movie.id
      );

      if (isAlreadyFavourite) {
        const recordToDelete = favourites.find(
          (fav) => fav.fields.id === movie.id
        );
        const deleteResponse = await fetch(
          `${favouritesUrl}/${recordToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (deleteResponse.ok) {
          setFavourites(favourites.filter((fav) => fav.fields.id !== movie.id));
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
                  id: movie.id,
                  title: movie.title,
                  overview: movie.overview,
                  poster_path: movie.poster_path,
                  release_date: movie.release_date,
                  vote_average: movie.vote_average,
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

  const getHistory = async () => {
    try {
      const response = await fetch(historyUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setHistoryMovie(data.records);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleAddToHistory = async (movie) => {
    try {
      const isAlreadyHistory = historyMovie.some(
        (his) => his.fields.id === movie.id
      );

      if (isAlreadyHistory) {
        const recordToDelete = historyMovie.find(
          (his) => his.fields.id === movie.id
        );
        const deleteResponse = await fetch(
          `${historyUrl}/${recordToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (deleteResponse.ok) {
          setHistoryMovie(
            historyMovie.filter((his) => his.fields.id !== movie.id)
          );
          console.log("Removed from history!");
        }
      } else {
        const postResponse = await fetch(historyUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  id: movie.id,
                  title: movie.title,
                  overview: movie.overview,
                  poster_path: movie.poster_path,
                  release_date: movie.release_date,
                  vote_average: movie.vote_average,
                },
              },
            ],
          }),
        });

        if (postResponse.ok) {
          const newHistory = await postResponse.json();
          setHistoryMovie([...historyMovie, ...newHistory.records]);
          console.log("Added to history!");
        }
      }
    } catch (error) {
      console.error("Error adding to history:", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
    getFavourites();
    getHistory();
  }, []);

  return (
    <div>
      <PopularMovies
        movies={movies}
        favourites={favourites}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        onAddToFavourite={handleAddToFavourite}
        historyMovie={historyMovie}
        onAddToHistory={handleAddToHistory}
      />
    </div>
  );
};

export default Home;
