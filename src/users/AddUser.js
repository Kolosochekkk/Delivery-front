import axios from 'axios';
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {

    let navigate=useNavigate()

    const [user,setUser]=useState({
        username:"",
        password:"",
        name:"",
        surname:"",
        phone:"",
        address:"",
        email:"",
        role: "USER"
    })

    const{username, password, name,surname, phone, address, email, role}=user

    const onInputChange=(e)=>{
        setUser({ ...user,[e.target.name]: e.target.value});

    }

    const onSubmit = async (e) => {
        e.preventDefault();
       
        if (user.role === "ADMIN") {
          user.roles = ["ADMIN"];
        } else {
          user.roles = ["USER"];
        }
        await axios.post("http://localhost:8080/user", user);
        navigate("/users");
    };

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-2 mt-2'>

            <h4 className='text-center m-4'>Добавить пользователя</h4>
            <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
                <label htmlFor='Username' className='form-label'>
                Логин
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Введите логин'
                name='username'
                value={username}
                onChange={(e)=>onInputChange(e)}
                />
            </div><div className='mb-3'>
                <label htmlFor='Password' className='form-label'>
                Пароль
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Введите пароль'
                name='password'
                value={password}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>
                Имя
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Введите имя'
                name='name'
                value={name}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='Surname' className='form-label'>
                Фамилия
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Введите фамилию'
                name='surname'
                value={surname}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='Phone' className='form-label'>
                Номер телефона
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
                <label htmlFor='Address' className='form-label'>
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
                <label htmlFor='Email' className='form-label'>
                Адрес электронной почты
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Введите адрес электронной почты'
                name='email'
                value={email}
                onChange={(e)=>onInputChange(e)}
                />
            </div>

            <div className="mb-3">
              <label htmlFor="Role" className="form-label">Роль</label>
              <select className="form-control" name="role" value={role} onChange={(e) => onInputChange(e)}>
                <option value="USER">Пользователь</option>
                <option value="ADMIN">Администратор</option>
              </select>
            </div>

            <button type='submit' className='btn btn-outline-primary'>Добавить</button>
            <Link className='btn btn-outline-danger mx-2' to="/users">Отмена</Link>
            </form>
            </div>
        </div>
    </div>
  )
}
