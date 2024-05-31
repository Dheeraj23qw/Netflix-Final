import React from "react";
import Navbar2 from "../src/component/navbar2";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addwishlist } from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Moviehomepg() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { movieData } = location.state;

  const handleAddToWishlist = () => {
    dispatch(addwishlist(movieData)); // Dispatching addwishlist action with movieData
    toast.success("Added to Watchlist!");
  };

  const handleCart = () => {
    navigate("/cart", { state: { movieData } });
  };
  
  return (
    <>
      <Navbar2 />

      <div
        className="movie-container"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
           url(https://image.tmdb.org/t/p/original/${movieData.backdrop})`,
        }}
      >
        <div className="movie-details">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieData.poster}`}
            alt={movieData.name}
            className="poster"
          />
        </div>
        <div className="content">
          <h1>{movieData.name}</h1>
          <div className="genre">
            {movieData.genres && movieData.genres.length > 0 && (
              <>
                Genres:
                {movieData.genres.map((genre) => genre).join(" | ")}
              </>
            )}
          </div>
          <div className="overview">{movieData.overview}</div>
          <div className="buttons">
            <button className="buy-button" onClick={handleCart}>
              Watch Now
            </button>
            <div className="wishlist-button">
              <AiOutlinePlus size={24} onClick={handleAddToWishlist} />
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
      <style jsx="true">{`
        .movie-container {
          position: relative;
          width: 100%;
          height: calc(100vh - 80px);
          margin-top: 80px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          box-sizing: border-box;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: white;
          padding-left: 20px;
          perspective: 1000px;
        }

        .movie-details {
          position: relative;
          z-index: 1;
          max-width: 40%;
          text-align: left;
          margin-left: 50px;
          transform: translateZ(30px);
          box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
        }

        .movie-details img.poster {
          width: 100%;
          height: 80vh;
          margin: 0px 60px;
          margin-top: 30px;
          border-radius: 10px;
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
        }
        .content {
          position: relative;
          z-index: 1;
          width: 50%;
          height: 50%;
          margin-top: 60px;
          margin-left: 100px;
          text-align: left;
          transform: translateZ(30px);
          box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
        }

        .content h1 {
          margin: 0;
          font-size: 3.5em;
          color: white;
          font-weight: bold;
          font-family: "Arial", sans-serif; /* Specify your preferred font family */
          text-shadow: 2px 2px 5px rgba(0.2, 0.3, 0, 0.7); /* Add a subtle shadow effect */
        }

        .content .genre {
          font-weight: 700;
          font-size: 1.2em;
          margin-top: 1.8em;
          margin-bottom: 1em;
          text-align: left;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
        }

        .overview {
          font-size: 1.1em;
          line-height: 1.5;
          margin-bottom: 2em;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
          color: #ffffff;
        }

        .buttons {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .buy-button {
          padding: 10px 20px;
          font-size: 1.3em;
          font-weight: 800;
          border: none;
          width: 450px;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s;
          box-shadow: 1px 1px 2px rgba(0.2, 0.3, 0.2, 0.3);
        }

        .buy-button {
          background-color: #dc143c;
          color: white;
        }

        .buy-button:hover {
          background-color: red;
        }

        .wishlist-button {
          background-color: #fff;
          color: black;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wishlist-button:hover {
          background-color: #ddd;
        }
      `}</style>
    </>
  );
}
