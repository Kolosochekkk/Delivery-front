import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import UserMenu from './UserMenu';

export default function Orders() {

  const [orders, setOrders] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadOrders()
  }, []);

  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData.id;

  const loadOrders = async () => {
    const result = await axios.get(`http://localhost:8080/orders/user/${userId}`);
    setOrders(result.data);
  }

  const handleDelivered = async (order) => {
    const result = await axios.put(`http://localhost:8080/order/${order.id}`, { ...order, status: 'Получен' });
    const updatedOrder = result.data;
    const updatedOrders = orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o));
    setOrders(updatedOrders);
  };

  const handleCancelled = async (order) => {
    const result = await axios.put(`http://localhost:8080/order/${order.id}`, { ...order, status: 'Отменен' });
    const updatedOrder = result.data;
    const updatedOrders = orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o));
    setOrders(updatedOrders);
  };

  return (
    <>
      <UserMenu />
      <div className="table-wrapper">
        <h4 style={{ textAlign: 'center', margin: 'auto' }}>Список заказов</h4>
      </div>
      <div className='container'>
        <div className='py-4'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Адрес</th>
                <th scope="col">Сумма</th>
                <th scope="col">Статус</th>
                <th scope="col">Действие</th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order, index) => (
                  <tr>
                    <th scope="row" key={index}>{index + 1}</th>
                    <td>{order.user.address}</td>
                    <td>{order.total} руб.</td>
                    <td>{order.status}</td>
                    <td>
                      {order.status === 'Принят' && (
                        <>
                          <button className="btn btn-outline-dark mx-2" onClick={() => handleDelivered(order)}>Доставлен</button>
                        </>
                      )}
                      {order.status === 'В обработке' && (
                        <>
                          <button className="btn btn-outline-dark mx-2" onClick={() => handleCancelled(order)}>Отменить</button>
                        </>
                      )}
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
