import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

export default function AddDish() {
  const navigate = useNavigate();
  const [dish, setDishes] = useState({
    
    name: '',
    price: 0
    
  });

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');

  const { name, price } = dish;

  const onInputChange = (e) => {
    setDishes({ ...dish, [e.target.name]: e.target.value });
  };

  const onRestaurantSelect = (e) => {
    setSelectedRestaurant(e.target.value);
    setDishes({ ...dish, restaurantId: e.target.value });
  };

  //formData.append("photos", e.target.photos.files[0]);
  const onSubmit = async (e) => {
    console.log(selectedRestaurant);
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('photo',  e.target.photo.files[0]);
    formData.append('dish', new Blob([JSON.stringify(dish)], {
      type: 'application/json'
    }));
  
    await axios.post(`http://localhost:8080/restaurant/${selectedRestaurant}`, formData, {

      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    navigate('/dishes');
  };
    useEffect(() => {
    const fetchRestaurants = async () => {
      const result = await axios.get('http://localhost:8080/restaurants');
      setRestaurants(result.data);
    };
    fetchRestaurants(); }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-2 mt-2">
          <h4 className="text-center m-4">Добавить блюдо</h4>
          <form onSubmit={(e) => onSubmit(e)} enctype="multipart/form-data">
          <div className="form-group">
          <label htmlFor="restaurant">Ресторан</label>
          <select
            className="form-control"
            id="restaurant"
            name="restaurantId"
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
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Название
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Введите название блюда"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Стоимость
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Введите стоимость"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
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
