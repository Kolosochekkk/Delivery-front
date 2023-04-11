import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8080/loginuser', { username, password })
      .then((response) => {
        if (response.data.roles.includes('ADMIN')) {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/home');
        } else {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/userHome');
        }
      })
      .catch((error) => {
        setError('Данные введены неверно!');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="card p-5">
          <h2 className="text-center mb-5">Авторизация</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Имя пользователя:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Введите имя пользователя"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Пароль:
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Введите пароль"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-outline-dark w-100 mt-4">
            Войти
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
