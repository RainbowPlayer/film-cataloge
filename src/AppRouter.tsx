import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MoviesList from './container/MoviesList/MoviesList';
import { ROUTING } from './constats/ROUTING';
import MoviesDetailed from './container/MoviesDetailed/MoviesDetailed'
import FavoriteMovies from './container/FavoriteMovies/FavoriteMovies';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTING.MOVIES} element={<MoviesList />}/>
        <Route path={`${ROUTING.MOVIE_DETAILS}`} element={<MoviesDetailed />} />
        <Route path={ROUTING.MOVIE_FAVORITES} element={<FavoriteMovies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
