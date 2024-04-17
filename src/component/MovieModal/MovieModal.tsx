import { useState, useEffect } from 'react';
import { Movie } from '../../types/types';
import Input from '../Input/Input';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addMovie, updateMovie, deleteMovie } from '../../redux/slicers/moviesSlice';
import Button from '../Button/Button';
import './style.css'

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
}

const MovieModal = ({ isOpen, onClose, movie }: MovieModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<Movie>({
    id: 0,
    title: '',
    description: '',
    release_date: '',
    rating: 0,
    genre: [],
    actors: [],
    director: '',
    image: '',
    favorite: false
  });

  useEffect(() => {
    if (movie) {
      setFormData(movie);
    } else {
      setFormData({
        id: null,
        title: '',
        description: '',
        release_date: '',
        rating: 0,
        genre: [],
        actors: [],
        director: '',
        image: '',
        favorite: false
      });
    }
  }, [movie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "genre" || name === "actors") {
      setFormData(prev => ({ ...prev, [name]: value.split(',').map(item => item.trim()) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id) {
      dispatch(addMovie({ ...formData, id: undefined }));
    } else {
      dispatch(updateMovie(formData));
    }
    onClose();
  };
  

  const handleDelete = () => {
    if (formData.id) {
      dispatch(deleteMovie(formData.id));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <form className='modal-content' onSubmit={handleSubmit}>
        <Input className='modal-input' type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
        <Input className='modal-input' type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description"/>
        <Input className='modal-input' type="date" name="release_date" value={formData.release_date} onChange={handleChange} />
        <Input className='modal-input' type="number" name="rating" value={formData.rating.toString()} onChange={handleChange} placeholder="Rating" />
        <Input className='modal-input' type="text" name="genre" value={formData.genre.join(', ')} onChange={handleChange} placeholder="Genre" />
        <Input className='modal-input' type="text" name="actors" value={formData.actors.join(', ')} onChange={handleChange} placeholder="Actors" />
        <Input className='modal-input' type="text" name="director" value={formData.director} onChange={handleChange} placeholder="Director" />
        <Input className='modal-input' type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
        <div className='modal-button-content'>
          <Button className='modal-button' type="submit">Save</Button>
          {formData.id !== 0 && <Button className='modal-button' type="button" onClick={handleDelete}>Delete</Button>}
          <Button className='modal-button' type="button" onClick={onClose}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default MovieModal;



