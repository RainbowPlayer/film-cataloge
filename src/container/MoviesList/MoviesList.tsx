import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../redux/slicers/moviesSlice';
import { RootState, AppDispatch } from '../../redux/store';
import MovieCard from "../../component/MovieCard/MovieCard";
import Input from '../../component/Input/Input';
import { useNavigate } from 'react-router-dom';
import MovieModal from '../../component/MovieModal/MovieModal';
import { Movie } from '../../types/types';
import Button from '../../component/Button/Button';
import './style.css'

const MoviesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const status = useSelector((state: RootState) => state.movies.status);
  const [searchTitle, setSearchTitle] = useState('');
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [dispatch, status]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  const handleMovieClick = (id: number) => {
    navigate(`/movies/${id}`);
  };

  const handleViewFavorites = () => {
    navigate('/favorites');
  };

  const handleAddMovie = () => {
    setSelectedMovie(null);
    setModalOpen(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  return (
    <div className="list-container">
      <div className='list-top'>
        <Button className="button-list" onClick={handleAddMovie}>Add Movie</Button>
        <MovieModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          movie={selectedMovie}
        />
        <Input className="search-input" type='text' value={searchTitle} placeholder='Search movies by title...' onChange={handleSearchChange}/>
        <Button className="button-list" onClick={handleViewFavorites}>View Favorite Movies</Button>
      </div>

      <div className="movies-list">
        {filteredMovies.map(movie => (
          <MovieCard 
            key={movie.id}
            id={movie.id}
            favorite={movie.favorite}
            title={movie.title}
            release_date={movie.release_date}
            rating={movie.rating}
            image={movie.image}
            onClick={() => handleMovieClick(movie.id)}
            onEdit={() => handleEditMovie(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;

