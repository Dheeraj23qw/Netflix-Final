import React from "react";
import Navbar2 from "./navbar2";
import { useSelector } from "react-redux";
import Card from "./card";
import styles from "./userLiked.module.css"
export default function UserLiked() {
  const wishlistItems = useSelector(state => state.netflix.wishlistItems);

  return (
    <div style={{ background: "black", height: "100vh" }}>
      <Navbar2 />
     <div className={styles.heading}>My wishlist</div>
      <div className={styles.container}>
    
        {wishlistItems.map(movie => (
          <Card key={movie.id} movieData={movie} />
        ))}
      </div>
    </div>
  );
}
