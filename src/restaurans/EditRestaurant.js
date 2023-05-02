import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditRestaurant() {

    let navigate=useNavigate()

    const {id}=useParams()

    const [restaurant,setRestaurant]=useState({
        name: '',
        address: '',
        phone: '',
        stars: 0
    })

    const { name, address, phone, stars } = restaurant;

    const onInputChange=(e)=>{
        setRestaurant({ ...restaurant,[e.target.name]: e.target.value});

    };

    useEffect(() => {
        loadRestaurant();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo',  e.target.photo.files[0]);
        formData.append('restaurant', new Blob([JSON.stringify(restaurant)], {
          type: 'application/json'
        }));

        await axios.put(`http://localhost:8080/restaurant/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
        navigate("/restaurants");
    }

    const loadRestaurant = async()=>{
        const result = await axios.get(`http://localhost:8080/restaurant/${id}`);
        setRestaurant(result.data);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-2 mt-2'>
            <h4 className='text-center m-4'>Редактирование ресторана</h4>
            <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                    Название
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Введит название ресторана'
                name='name'
                value={name}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='phone' className='form-label'>
                Телефон
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Введите номер телефона'
                name='phone'
                value={phone}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='address' className='form-label'>
                Адрес
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Введите адрес'
                name='address'
                value={address}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='stars' className='form-label'>
                Кол-во звезд
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Введите количество звезд'
                name='stars'
                value={stars}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Лого ресторана
              </label>
              <input
                type="file"
                className="form-control"
                id="photo"
                name="photo"
                accept=".jpg,.png,.jpeg"
              />
            </div>
            <button type='submit' className='btn btn-outline-primary'>Изменить</button>
            <Link className='btn btn-outline-danger mx-2' to="/home">Отмена</Link>
            </form>
            </div>
        </div>
    </div>
  )
}
