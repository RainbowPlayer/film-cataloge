import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './style.css'

const MovieDetailed = () => {
    const { id } = useParams<{ id: string }>();

    const movie = useSelector((state: RootState) => 
      state.movies.movies.find(m => m.id.toString() === id)
    );

    if (!movie) {
      return <div className="movie-not-found">Movie not found</div>;
    }

    return (
      <div className="detailed-movie-card">
        <img src={movie.image} alt={movie.title} className="movie-image" />
        <div className="detailed-movie-info">
          <h3 className="movie-title">{movie.title} ({movie.release_date})</h3>
          <p className="movie-description"><strong>Description:</strong> {movie.description}</p>
          <p className="movie-actors"><strong>Actors:</strong> {movie.actors.join(', ')}</p>
          <p className="movie-director"><strong>Director:</strong> {movie.director}</p>
          <p className="movie-genre"><strong>Genre:</strong> {movie.genre.join(', ')}</p>
          <p className="movie-rating"><strong>Rating:</strong> {movie.rating}</p>
        </div>
      </div>
    );
  };
  
export default MovieDetailed;

  