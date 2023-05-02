import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import UserMenu from './UserMenu';
import { Modal, Table } from "react-bootstrap";

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

    const [user, setUser] = useState({
      name: '',
      surname: '',
      phone: '',
      address: '',
      email: '',
    });
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData.id;

  useEffect(() => {
    
    axios
      .get(`http://localhost:8080/user/${userId}`)
      .then((response) => {
        const userData = response.data;

        setUser({
          name: userData.name,
          surname: userData.surname,
          phone: userData.phone,
          address: userData.address,
          email: userData.email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]); 

  useEffect(() => {
    loadCarts()
  }, [id]);

  const loadCarts = async () => {
    const result = await axios.get(`http://localhost:8080/carts/user/${userId}`);
    setCarts(result.data);
  }

  const deleteCart = async (id) => {
    await axios.delete(`http://localhost:8080/cart/${id}`)
    loadCarts()
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8080/user/${userId}`, user)
      .then((response) => {
        console.log(response.data);
        // Успешно обновлено
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };*/

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
                  <td><button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    Подтвердить заказ
                  </button></td>
                </tr>
              </tfoot>
            </table>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Подтвердить заказ</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className='mb-3'>
                    <label htmlFor='Surname' className='form-label'>
                      Фамилия
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Введите фамилию'
                      name='surname'
                      value={user.surname}
                      
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='Name' className='form-label'>
                      Имя
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Введите имя'
                      name='name'
                      value={user.name}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='Phone' className='form-label'>
                      Номер телефона
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Введите номер телефона' name='phone'
                      value={user.phone}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='Address' className='form-label'>
                      Адрес
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Введите адрес'
                      name='address'
                      value={user.address}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='Email' className='form-label'>
                      Email
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Введите email'
                      name='email'
                      value={user.email}
                    />
                  </div>
                  <button type='submit' className='btn btn-primary'>
                    Сохранить изменения
                  </button>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </>)
}
