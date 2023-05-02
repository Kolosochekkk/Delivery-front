import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminMenu from './AdminMenu';

export default function Promocode() {
  const [promocodes, setPromocodes] = useState([]);

  useEffect(() => {
    loadPromocodes();
  }, []);

  const loadPromocodes = async () => {
    const result = await axios.get("http://localhost:8080/promocodes");
    setPromocodes(result.data);
  }

  const deletePromocode = async (id) => {
    await axios.delete(`http://localhost:8080/promocode/${id}`);
    loadPromocodes();
  }

  return (
    <>
      <AdminMenu />
      <div className="table-wrapper">
      <h4 style={{ textAlign: 'center', margin: 'auto' }}>Список промокодов</h4>
        <Link className="btn btn-primary" style={{ backgroundColor: 'black', color: 'white' }} to={`/addpromocode`}>Добавить промокод</Link>
</div>
    <div className='container'>
      <div className='py-4'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Код</th>
              <th scope="col">Сумма скидки</th>
              <th scope="col">Действие</th>
            </tr>
          </thead>
          <tbody>
            {promocodes.map((promocode, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{promocode.code}</td>
                <td>{promocode.summ}</td>
                <td>
                  <Link
                    className="btn btn-outline-dark mx-2"
                    to={`/editpromocode/${promocode.id}`}
                  >
                    Изменить
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deletePromocode(promocode.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>);
}
