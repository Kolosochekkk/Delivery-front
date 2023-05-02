import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import AdminMenu from './AdminMenu';

export default function Restaurant() {

  const [restaurants, setRestaurants] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadRestaurants()
  },[]);

  const loadRestaurants = async () => {
    const result = await axios.get("http://localhost:8080/restaurants");
    setRestaurants(result.data);
  }

  const deleteRestaurant = async (id) => {
    await axios.delete(`http://localhost:8080/restaurant/${id}`)
    loadRestaurants()
  }

  return (
    <>
      <AdminMenu />
      <div className="table-wrapper">
      <h4 style={{ textAlign: 'center', margin: 'auto' }}>Список ресторанов</h4>


  <Link className="btn btn-primary" style={{ backgroundColor: 'black', color: 'white' }} to={`/addrestaurant`}>Добавить ресторан</Link>
</div>
      <div className='container'>
        <div className='py-4'>
        
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Адрес</th>
                <th scope="col">Номер телефона</th>
                <th scope="col">Оценка</th>
                <th scope="col">Логотип</th>
                <th scope="col">Действие</th>
              </tr>
            </thead>
            <tbody>
              {
                restaurants.map((restaurant,index)=>(
                <tr>
                  <th scope="row" key={index}>{index+1}</th>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.address}</td>
                  <td>{restaurant.phone}</td>
                  <td>{restaurant.stars}</td>
                  <td><img src={`http://localhost:8080${restaurant.photosImagePath}`} alt="нет" height="50" /></td>
                  <td>
                   <Link className="btn btn-outline-dark mx-2"      
                    to={`/editrestaurant/${restaurant.id}`}
                    >Изменить</Link>

                    <button className="btn btn-danger mx-2"
                    onClick={()=>deleteRestaurant(restaurant.id)}
                    >Удалить</button>
                  </td>
                </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
