import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import MovieCard from '../../component/MovieCard/MovieCard';

const FavoriteMovies = () => {
  const movies = useSelector((state: RootState) => state.movies.movies.filter(movie => movie.favorite));

  return (
    <div>
      <h2>Favorite Movies</h2>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            release_date={movie.release_date}
            rating={movie.rating}
            image={movie.image}
            favorite={movie.favorite}
            onClick={() => {}}
            onEdit={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies;
