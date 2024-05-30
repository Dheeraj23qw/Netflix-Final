import React, { useState } from "react";
import axios from "axios";

const API_KEY = "6dabf99436663f10ca021167ad383fdc";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data from TMDb", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={searchMovies} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
          className="search-input"
        />
      </form>
      <div className="movies-list">
        {movies.length > 0
          ? movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
                <div className="movie-details">
                  <h3 className="movie-title">{movie.title}</h3>
                </div>
              </div>
            ))
          : null}
      </div>
      <style jsx>{`
        .container {
          text-align: center;
          position: relative;
          z-index: 2000; /* Ensure it is below the navbar's z-index */
          margin-right: 150px;

        }
        .search-form {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
          position: relative;
          z-index: 2000;
        }
        .search-input {
          padding: 20px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 15px 50px 30px;
          outline: none;
          width: 400px;
          height: 45px;
          position: relative;
          z-index: 2000;
        }
        .movies-list {
          display: flex;
          flex-direction: column;
          background-color:#343434;
          overflow-y: scroll;
          position: relative;
          z-index: 2000;
        }
        .movie-card {
          display: flex;
  
          width: 100%;
          margin-bottom: 20px; /* Add margin between movies */
          position: relative;
          z-index: 2000;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .movie-card img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
          position: relative;
          z-index: 2000;
        }

        .movie-title {
          font-size: 18px;
          margin: 0;
          pointer: cursor;
          position: relative;
          z-index: 2000;
        }
      `}</style>
    </div>
  );
};

export default MovieSearch;
8;
