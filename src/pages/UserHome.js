import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import "../styles/Back.css";
import UserMenu from './UserMenu';

export default function UserHome() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { id } = useParams();

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    const result = await axios.get('http://localhost:8080/restaurants');
    setRestaurants(result.data);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <UserMenu />
      <div className='container'>
        <h3 style={{ textAlign: 'center', margin: 'auto' }}>Список ресторанов</h3>
  
        <div className='row mt-4'>
          <div className='col-md-12 mb-3'>
            <form className='form-inline'>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Поиск по названию'
                aria-label='Search'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </form>
          </div>
          {filteredRestaurants.map((restaurant, index) => (
            <div className='col-sm-6 col-md-4 col-lg-3' key={index} style={{ padding: '5px' }}>
              <div className='card h-100' >
                <div className="text-center">
                  <img src={`http://localhost:8080${restaurant.photosImagePath}`} className='card-img-top' alt='...' />
                </div>
                <div className='card-body'>
                  <h5 className='card-title'>Ресторан {restaurant.name}</h5>
                  <p className='card-text'>{restaurant.address}</p>
                  <p className='card-text'>{restaurant.stars} звезды</p>
                  <Link className='btn btn-primary' to={`/viewdish/${restaurant.id}`}>
                    Просмотреть
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
