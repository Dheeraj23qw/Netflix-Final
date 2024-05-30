import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../src/component/navbar";
import { fetchMovies, getGenres } from "../store";
import Slider from "../src/component/slider";

export default function Netflix() {
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [genresLoaded, dispatch]);

  return (
    <div>
      <Navbar />
      {movies && movies.length ? <Slider movies={movies} type="all" /> : <p>No movies available</p>}
    </div>
  );
}
