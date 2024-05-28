import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./card";
import styles from "./cardslider.module.css";
import { useRef, useState } from "react";

export default function Cardslider({ data, title }) {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0); // Added sliderPosition state
  const listRef = useRef();
 
  const handleDirection = (direction) => {
    const distance = listRef.current.getBoundingClientRect().left; // Use left for horizontal positioning

    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${distance + 210}px)`; // Adjust according to direction
      setSliderPosition(sliderPosition - 1);
    } else if (direction === "right" && sliderPosition < data.length - 1) {
      listRef.current.style.transform = `translateX(${distance - 210}px)`; // Adjust according to direction
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className={styles.wrapper}>
        <div
          className={`${styles.sliderControl} ${styles.left} ${
            showControls ? styles.show : ""
          }`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className={styles.flex} ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div
          className={`${styles.sliderControl} ${styles.right} ${
            showControls ? styles.show : ""
          }`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </div>
  );
}
