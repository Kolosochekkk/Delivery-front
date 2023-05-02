import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate, useHistory  } from 'react-router-dom';

export default function AddRestaurant() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    phone: '',
    stars: 0,
    
  });

  const { name, address, phone, stars } = restaurant;

  const onInputChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  //formData.append("photos", e.target.photos.files[0]);
  const onSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('photo',  e.target.photo.files[0]);
    formData.append('restaurant', new Blob([JSON.stringify(restaurant)], {
      type: 'application/json'
    }));
  
    await axios.post('http://localhost:8080/restaurant', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    navigate('/home');
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-2 mt-2">
          <h4 className="text-center m-4">Добавить ресторан</h4>
          <form onSubmit={(e) => onSubmit(e)} enctype="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Название
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Введите название"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Адрес
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Введите адрес"
                name="address"
                value={address}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Номер телефона
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Введите номер телефона"
                name="phone"
                value={phone}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stars" className="form-label">
                Оценка
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Введите оценку"
                name="stars"
                value={stars}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Логотип ресторана
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
            <Link className="btn btn-outline-danger mx-2" to="/restaurants">Отмена</Link>
</form>
</div>
</div>
</div>
);
}
