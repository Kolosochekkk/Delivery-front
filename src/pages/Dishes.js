import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import AdminMenu from './AdminMenu';

export default function Dishes() {

  const [dishes, setDishes] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadDishes()
  },[]);

  const loadDishes = async () => {
    const result = await axios.get("http://localhost:8080/dishes");
    setDishes(result.data);
  }

  const deleteDish = async (id) => {
    await axios.delete(`http://localhost:8080/dish/${id}`)
    loadDishes()
  }

  return (
    <>
      <AdminMenu />
      <div className="table-wrapper">
        <h4 style={{ textAlign: 'center', margin: 'auto' }}>Список блюд</h4>

        <Link className="btn btn-primary" style={{ backgroundColor: 'black', color: 'white' }} to={`/adddish`}>Добавить блюдо</Link>
        </div>
      <div className='container'>
        <div className='py-4'>
        
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Ресторан</th>
                <th scope="col">Название</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Фото</th>
                <th scope="col">Действие</th>
              </tr>
            </thead>
            <tbody>
              {
                dishes.map((dish,index)=>(
                <tr>
                  <th scope="row" key={index}>{index+1}</th>
                  <td>{dish.restaurant.name}</td>
                  <td>{dish.name}</td>
                  <td>{dish.price}</td>
                  <td><img src={`http://localhost:8080${dish.photosImagePath}`} alt="нет" height="50" /></td>
                  <td>
                    <Link className="btn btn-outline-dark mx-2"      
                    to={`/editdish/${dish.id}`}
                    >Изменить</Link>

                    <button className="btn btn-danger mx-2"
                    onClick={()=>deleteDish(dish.id)}
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
