
import React, { useEffect } from "react";
import Navbar from "../src/component/navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../src/component/slider";

export default function Netflix() {
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
   
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

 

  return (
    <div >
      <Navbar />
      <Slider movies={movies} type="all"/>
    </div>
  );
}
