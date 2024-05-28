import React from 'react';
import styles from './SelectGeners.module.css'; // Corrected file name
import { useDispatch } from 'react-redux'; // Corrected import statement
import { fetchDataByGenre } from '../../store';

const SelectGenres = ({ genres,type }) => {
  const dispatch = useDispatch(); // Moved useDispatch inside the functional component

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    dispatch(fetchDataByGenre({ genre: genreId,type })); // Removed "type" from the dispatch call
  };

  return (
   
    <div className={styles.selectContainer}>
      <select onChange={()=>handleGenreChange}> {/* Changed the onChange event handler */}
        <option value="" disabled>Select Genre</option>
        {
          genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
      </select>
    </div>
  
  );
};

export default SelectGenres;

