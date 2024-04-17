import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { toggleFavorite } from '../../redux/slicers/moviesSlice';
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import Button from '../Button/Button';
import './style.css'

interface MovieCardProps {
  id: number;
  title: string;
  release_date: string;
  rating: number;
  image: string;
  favorite: boolean;
  onClick: () => void;
  onEdit: () => void;
}


const MovieCard = ({ id, title, release_date, rating, image, favorite, onClick, onEdit }: MovieCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleFavorite = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="movie-card" >
      <img src={image} alt={title} onClick={onClick}/>
      <div className="movie-info">
        <h3>{title}</h3>
        <p>Release Date: {release_date}</p>
        <p>Rating: {rating}</p>
        <span className="favorite-icon" onClick={handleToggleFavorite}>
          {favorite ? <IoMdHeart /> : <IoIosHeartEmpty />}
        </span>
        <Button className="edit-button" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
