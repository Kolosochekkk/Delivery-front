import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import UserMenu from './UserMenu';

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.id;

  useEffect(() => {
    loadCarts()
  },[id]);

  const loadCarts = async () => {
    const result = await axios.get(`http://localhost:8080/carts/user/${userId}`);
    setCarts(result.data);
  }

  const deleteCart = async (id) => {
    await axios.delete(`http://localhost:8080/cart/${id}`)
    loadCarts()
  }

  const total = carts.reduce((acc, cart) => {
    return acc + (cart.dish.price * cart.number);
  }, 0);

  return (
    <>
    <UserMenu />
    <div>
      <h2>Ваш заказ</h2>
      <div className='container'>
        <div className='py-4'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Фото</th>
                <th scope="col">Название</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Количество</th>
                <th scope="col">Сумма</th>
                <th scope="col">Действие</th>
              </tr>
            </thead>
            <tbody>
              {carts.map(cart => (
                <tr key={cart.id}>
                  <td><img src={`http://localhost:8080${cart.dish.photosImagePath}`} alt={cart.dish.name} height="50" /></td>
                  <td>{cart.dish.name}</td>
                  <td>{cart.dish.price} руб.</td>
                  <td>{cart.number}</td>
                  <td>{cart.dish.price * cart.number} руб.</td>
                  <td>
                    <button className="btn btn-danger mx-2" onClick={() => deleteCart(cart.id)}>Удалить</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4"><h7>Время доставки: </h7></td>
                <td><h7>30-40 минут </h7></td> 
                <td></td>
              </tr>
            </tfoot>
            <tfoot>
              <tr>
                <td colSpan="4"><h5>Общая сумма: </h5></td>
                <td><h6>{total} руб.</h6></td> 
                <td><button className="btn btn-primary mx-2" >Подтвердить заказ</button></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    </>)
}
