import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Movie } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

interface MoviesState {
  movies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  status: 'idle',
  error: null
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get('http://localhost:3000/movies');
  return response.data;
});

export const toggleFavorite = createAsyncThunk(
  'movies/toggleFavorite',
  async (movieId: number, { getState }) => {
    const state = getState() as RootState;
    const movie = state.movies.movies.find(m => m.id === movieId);
    if (movie) {
      const updatedMovie = { ...movie, favorite: !movie.favorite };
      const response = await axios.put(`http://localhost:3000/movies/${movieId}`, updatedMovie);
      return response.data;
    }
    throw new Error('Movie not found');
  }
);

export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async (movie: Movie, { getState, dispatch }) => {
    const response = await axios.put(`http://localhost:3000/movies/${movie.id}`, movie);
    return response.data;
  }
);

export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (movieId: number, { dispatch, getState }) => {
    await axios.delete(`http://localhost:3000/movies/${movieId}`);
    return movieId;
  }
);

export const addMovie = createAsyncThunk(
  'movies/addMovie',
  async (movie: Movie, { getState, dispatch }) => {
    const movieWithId = { ...movie, id: uuidv4() };
    const response = await axios.post(`http://localhost:3000/movies`, movieWithId);
    return response.data;
  }
);


const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const index = state.movies.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update movie';
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(movie => movie.id !== action.payload);
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add movie';
      });
  }  
});

export default moviesSlice.reducer;