import React, { useState } from "react";
import styles from "./card.module.css";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removelist, addwishlist } from "../../store";

function Card({ movieData }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToWishlist = () => {
    dispatch(addwishlist(movieData)); // Dispatching addwishlist action with movieData
  };

  const handleRemoveFromWishlist = () => {
    dispatch(removelist({ id: movieData.id })); // Dispatching removelist action with movie ID
  };

  const navigateToPlayer = () => {
    navigate("/player", {
      state: { image: `https://image.tmdb.org/t/p/w500/${movieData.poster}` },
    });
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieData.poster}`}
        className={styles.poster}
        alt={movieData.name}
      />
      {isHovered && (
        <div className={styles.hover}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieData.poster}`}
            alt={movieData.name}
          />
          <div className={styles.infobox}>
            <h3 className={styles.title}>{movieData.name}</h3>
            <p className={styles.description}>{movieData.description}</p>
            <div>
              <IoPlayCircleSharp
                className={styles.icon}
                onClick={navigateToPlayer}
              />
              <RiThumbUpFill className={styles.icon} title="Like" />
              <RiThumbDownFill
                className={styles.icon}
                title="Dislike"
                onClick={handleRemoveFromWishlist}
              />
              <AiOutlinePlus
                className={styles.icon}
                title="Add to wishlist"
                onClick={handleAddToWishlist}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
