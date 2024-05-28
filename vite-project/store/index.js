import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "6dabf99436663f10ca021167ad383fdc";
const TMBD_BASE_URL = "https://api.themoviedb.org/3";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  wishlistItems: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  try {
    const response = await axios.get(
      `${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
});

const createArrayFromRawData = (array, genres) => {
  return array.map((movie) => ({
    id: movie.id,
    name: movie.original_name || movie.original_title,
    poster: movie.poster_path,
    backdrop: movie.backdrop_path,
    genres: movie.genre_ids
      .map((genreId) => {
        const genre = genres.find(({ id }) => id === genreId);
        return genre ? genre.name : null;
      })
      .filter(Boolean)
      .slice(0, 3),
  }));
};

const getRawData = async (api, genres, paging) => {
  try {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const response = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      moviesArray.push(
        ...createArrayFromRawData(response.data.results, genres)
      );
    }
    return moviesArray;
  } catch (error) {
    console.error("Error fetching raw data:", error);
    throw error;
  }
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    try {
      const { genres } = thunkApi.getState().netflix;
      return await getRawData(
        `${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
        genres,
        true
      );
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      throw error;
    }
  }
);

export const fetchDataByGenre = createAsyncThunk(
  "netflix/byGenre",
  async ({ genre, type }, thunkApi) => {
    try {
      const { genres } = thunkApi.getState().netflix;
      return await getRawData(
        `${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
        genres
      );
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      throw error;
    }
  }
);

const netflixSlice = createSlice({
  name: "netflix",
  initialState,
  reducers: {
    addwishlist: (state, action) => {
      
      const { backdrop, genres, id, name, poster } = action.payload;
      
      state.wishlistItems.push({ backdrop, genres, id, name, poster });
    },
    removelist: (state, action) => {
    
      const { id } = action.payload;
    
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(fetchDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
  },
});

export const store = configureStore({
  reducer: {
    netflix: netflixSlice.reducer,
  },
});

export default store;

export const { addwishlist, removelist } = netflixSlice.actions;
