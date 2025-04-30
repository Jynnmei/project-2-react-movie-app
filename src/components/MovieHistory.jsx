import React, { useEffect, useState } from "react";
import MovieClick from "./MovieClick";
import MoviesModal from "./MoviesModal";
import "./Movies.css";

const MovieHistory = () => {
  const [history, setHistory] = useState([]);
  const [selectedHistoryMovie, setSelectedHistoryMovie] = useState(null);

  const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
  const baseId = "appQwlxLJ1uNitKKv";
  const historyTableName = "historyMovies";
  const historyUrl = `https://api.airtable.com/v0/${baseId}/${historyTableName}`;

  const getHistory = async () => {
    try {
      const response = await fetch(historyUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setHistory(data.records);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleRemoveHistory = async (historied) => {
    try {
      await fetch(`${historyUrl}/${historied.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      setHistory(history.filter((his) => his.id !== historied.id));
      console.log("Removed from historied!");
    } catch (error) {
      console.error("Error removing history:", error);
    }
  };

  const closeModal = () => {
    setSelectedHistoryMovie(null);
  };

  useEffect(() => {
    getHistory();
  }, []);

  const validHistory = history.filter((movie) => {
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
    <div className="history">
      <div className="history-movie">
        {validHistory.length > 0 ? (
          validHistory.map((movie) => (
            <div key={movie.id} className="movie-card">
              <MovieClick
                movie={movie}
                onMovieClick={() => setSelectedHistoryMovie(movie.fields)}
                onRemoveHistory={() => handleRemoveHistory(movie)}
                isHistory={true}
              />
            </div>
          ))
        ) : (
          <p>No history yet!</p>
        )}
      </div>
      {selectedHistoryMovie && (
        <MoviesModal movie={selectedHistoryMovie} closeModal={closeModal} />
      )}
    </div>
  );
};

export default MovieHistory;
