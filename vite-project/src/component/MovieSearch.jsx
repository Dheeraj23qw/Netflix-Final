import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = "6dabf99436663f10ca021167ad383fdc";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const movieListRef = useRef(null);

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
      setIsListVisible(true);
    } catch (error) {
      console.error("Error fetching data from TMDb", error);
    }
  };

  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (movieListRef.current && !movieListRef.current.contains(event.target)) {
      setIsListVisible(false);
    }
  };

  const handleMovieClick = (movie) => {
    const movieData = {
      name: movie.title,
      overview: movie.overview,
      poster: movie.poster_path,
      backdrop: movie.backdrop_path,
    };
    console.log(movieData);
    navigate("/moviepg", {
      state: { movieData: movieData },
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="movie-search-container">
      <form onSubmit={searchMovies} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      {isListVisible && (
        <div className="movies-list" ref={movieListRef}>
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
                    <h3
                      className="movie-title"
                      onClick={() => handleMovieClick(movie)}
                    >
                      {movie.title}
                    </h3>
                  </div>
                </div>
              ))
            : null}
        </div>
      )}
      <style jsx>{`
        .movie-search-container {
          position: relative;
          right: 150px;
          top: 10px;
        }
        .search-form {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .search-input-wrapper {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 50px;
          overflow: hidden;
        }
        .search-input {
          padding: 10px 20px;
          font-size: 16px;
          border: none;
          outline: none;
          flex: 1;
          height: 40px;
          width: 350px;
        }
        .search-button {
          padding: 8px 10px;
          font-weight: bold;
          border-radius: 6px;
          font-size: 14px;
          border: none;
          background: red;
          color: white;
          cursor: pointer;
          outline: none;
          margin: 8px 10px;
        }
        .search-button:hover {
          background-color: crimson;
        }
        .movies-list {
          position: absolute;
          top: 60px;
          left: 0;
          right: 0;
          margin: auto;
          width: 90%;
          max-width: 800px;
          background-color: #343434;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow-y: scroll;
          max-height: 400px;
          z-index: 2000; /* Ensure it is above other content */
        }
        .movies-list::-webkit-scrollbar {
          width: 8px; /* Width of the scrollbar */
        }
        .movies-list::-webkit-scrollbar-track {
          background: #f1f1f4; /* Track color */
        }
        .movie-card {
          display: flex;
          margin: 10px;
          padding: 10px;
          border-radius: 8px;
          background: black;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .movie-card img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }
        .movie-title {
          font-size: 14px;
          margin: 0;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default MovieSearch;
