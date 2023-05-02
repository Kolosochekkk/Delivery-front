import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AddPromocode() {
  const [promocode, setPromocode] = useState({
    code: '',
    summ: 0,
  });

  const onInputChange = (e) => {
    setPromocode({ ...promocode, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/promocode', promocode);
    window.location.href = '/promocode';
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-2 mt-2">
          <h4 className="text-center m-4">Добавление промокода</h4>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="code">Код</label>
                <input
                  type="text"
                  className="form-control"
                  id="code"
                  name="code"
                  value={promocode.code}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="summ">Сумма скидки</label>
                <input
                  type="number"
                  className="form-control"
                  id="summ"
                  name="summ"
                  value={promocode.summ}
                  onChange={onInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Добавить
              </button>
              <Link to="/promocode" className="btn btn-danger mx-2">
                Отмена
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
