import React from 'react';
import styles from './SelectGeners.module.css'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchDataByGenre } from '../../store';

const SelectGenres = ({ genres, type }) => {
  const dispatch = useDispatch(); 
  const movies = useSelector((state) => state.netflix.movies); 

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    dispatch(fetchDataByGenre({ genre: genreId, type }));
  };

  return (
    <div className={styles.selectContainer}>
      <select onChange={handleGenreChange}> 
        <option value="" disabled>Select Genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGenres;
