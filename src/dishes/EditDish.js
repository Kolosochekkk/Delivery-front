import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function EditDish() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dish, setDish] = useState({
    id: '',
    name: '',
    price: 0,
    restaurantId: '',
  });

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');

  const { name, price } = dish;

  const onInputChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  const onRestaurantSelect = (e) => {
    setSelectedRestaurant(e.target.value);
    setDish({ ...dish, restaurantId: e.target.value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', e.target.photo.files[0]);
    formData.append('dish', new Blob([JSON.stringify(dish)], { type: 'application/json' }));

    await axios.put(`http://localhost:8080/dish/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    navigate('/dishes');
  };

  useEffect(() => {
    const fetchDish = async () => {
      const result = await axios.get(`http://localhost:8080/dish/${id}`);
      setDish(result.data);
      setSelectedRestaurant(result.data.restaurantId);
    };
    fetchDish();
  }, [id]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const result = await axios.get('http://localhost:8080/restaurants');
      setRestaurants(result.data);
      };
      fetchRestaurants();
      }, []);
      
      return (
        <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-2 mt-2'>
      <h2>Редактирование блюда</h2>
      <form onSubmit={onSubmit}>
      <div className="form-group">
      <label htmlFor="restaurant">Ресторан</label>
      <select
               className="form-control"
               id="restaurant"
               name="restaurant"
               value={selectedRestaurant}
               onChange={onRestaurantSelect}
             >
      <option value="">Выберите ресторан</option>
      {restaurants.map((restaurant) => (
      <option key={restaurant.id} value={restaurant.id}>
      {restaurant.name}
      </option>
      ))}
      </select>
      </div>
      <div className="form-group">
      <label htmlFor="name">Название</label>
      <input
               type="text"
               className="form-control"
               id="name"
               name="name"
               value={name}
               onChange={onInputChange}
             />
      </div>
      <div className="form-group">
      <label htmlFor="price">Стоимость</label>
      <input
               type="number"
               className="form-control"
               id="price"
               name="price"
               value={price}
               onChange={onInputChange}
             />
      </div>
      <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Изображение блюда
              </label>
              <input
                type="file"
                className="form-control"
                id="photo"
                name="photo"
                accept=".jpg,.png,.jpeg"
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Добавить
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/dishes">Отмена</Link>
      </form>
      </div>
      </div>
      </div>
      );
      }
