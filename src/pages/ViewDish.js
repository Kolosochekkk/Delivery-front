import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/Back.css";
import UserMenu from './UserMenu';


export default function ViewDish() {
  const [restaurant, setRestaurant] = useState({});
  const [dishes, setDishes] = useState([]);
  const { id } = useParams();
  const [number, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.id;


  useEffect(() => {
    const loadRestaurantAndDishes = async () => {
      const restaurantResult = await axios.get(`http://localhost:8080/restaurant/${id}`);
      setRestaurant(restaurantResult.data);
      const dishesResult = await axios.get(`http://localhost:8080/dishes?restaurantId=${id}`);
      setDishes(dishesResult.data);
    };

    loadRestaurantAndDishes();
  }, [id]);

  const handleAddToCart = async (dishId, restaurantId) => {
    try {
      await axios.post(`http://localhost:8080/cart/${userId}/${dishId}/${restaurantId}`, {
        userId: userId,
        dishId: dishId,
        number: number,
        restaurantId: restaurant.id // Добавляем количество блюд в запрос
      });
      alert('Блюдо добавлено в корзину!');
    } catch (error) {
      console.error(error);
      alert('Ошибка при добавлении блюда в корзину');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <>
      <UserMenu />
    <div className="container">
  <div className="container d-flex justify-content-center">
  <div className="d-flex align-items-center">
    <div className="mr-4">
      <img src={`http://localhost:8080${restaurant.photosImagePath}`} className="img-fluid" />
    </div>
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.address}</p>
      <p>{restaurant.phone}</p>
      <p>{restaurant.stars} звезды</p>
    </div>
  </div>
</div>

<h2>Блюда ресторана {restaurant.name}</h2>
        <div className="row">
          <div className='col-md-12 mb-3'>
            <form className='form-inline'>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Поиск по названию блюда'
                aria-label='Search'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </form>
          </div>
          {filteredDishes.map((dish, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={index} style={{ padding: '5px' }}>
            <div className="card h-100">
              <div className="text-center">
                <img src={`http://localhost:8080${dish.photosImagePath}`} className="card-img-top" alt="..." />
              </div>
              
              <div className="card-body">
                <h5 className="card-title">{dish.name}</h5>
                <p className="card-text">{dish.price} руб.</p>
                <input type="number" min="1" value={number} onChange={(event) => setQuantity(event.target.value)} style={{ width: `${(number.toString().length * 50) + 10}px`, marginRight: '55px', marginLeft: '55px', marginBottom: '10px' }} size={number.toString().length} />
                <button className="btn btn-primary" onClick={() => handleAddToCart(dish.id, restaurant.id)}>Добавить в корзину</button>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
