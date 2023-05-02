import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';


export default function Cabinet() {
  const [user, setUser] = useState({
    username: '',
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
          username: userData.username,
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
    <UserMenu />
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-2 mt-2'>
          <h3 className='text-center m-4'>Профиль</h3>
          <form onSubmit={handleSubmit}>
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='Username' className='form-label'>
                Логин
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Введите логин'
                name='username'
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='Phone' className='form-label'>
                Номер телефона
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Введите номер телефона'name='phone'
                value={user.phone}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Сохранить изменения
            </button>
          </form>
          <hr />
        </div>
      </div>
    </div>
    </>
  );
}    
               
