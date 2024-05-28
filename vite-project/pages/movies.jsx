import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Navbar2 from "../src/component/navbar2";
import NotAvailable from "../src/component/NotAvailable";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../src/component/slider";
import SelectGeners from "../src/component/SelectGeners";

export default function Movies() {
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);

  const genres = useSelector((state) => state.netflix.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "movie" }));
  }, [genresLoaded]);

  return (
    <div>
      <Navbar2 />

      <SelectGeners genres={genres} type="movie" />
      <div className="data">
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </div>
  );
}
