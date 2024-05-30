import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar2 from "../src/component/navbar2";
import NotAvailable from "../src/component/NotAvailable";
import { fetchMovies, getGenres } from "../store";
import Slider from "../src/component/slider";
import SelectGeners from "../src/component/SelectGeners";

export default function Tv() {
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "tv" }));
    }
  }, [genresLoaded, dispatch]);

  return (
    <div>
      <Navbar2 />
      <SelectGeners genres={genres} type="tv" />
      <div className="data">
        {movies && movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </div>
  );
}
