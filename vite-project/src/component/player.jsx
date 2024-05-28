import React from "react";
import styles from "./player.module.css";
import { useLocation } from "react-router-dom";

export default function Player() {
  const location = useLocation();

 
  const image = location.state && location.state.image;

  return (
    <div className={styles.player}>
      <video
        src="images/video.mp4"
        width="100%"
        height="100%"
        controls
        loop
        preload="auto"
        poster={image} 
      ></video>
    </div>
  );
}
