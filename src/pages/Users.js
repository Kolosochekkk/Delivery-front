import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
//import Menu from '../menu/AdminMenu';

export default function Users() {

  const [users, setUsers] = useState([]);

  const {id} = useParams()

  useEffect(() => {
    loadUsers()
  },[]);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  }

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`)
    loadUsers()
  }

  return (
    <>
       
       <div className="table-wrapper">
      <h4 style={{ textAlign: 'center', margin: 'auto' }}>Список пользователей</h4>


  <Link className="btn btn-primary" style={{ backgroundColor: 'black', color: 'white' }} to={`/adduser`}>Добавить пользователя</Link>
</div>
      <div className='container'>
        <div className='py-4'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user,index)=>(
                <tr>
                  <th scope="row" key={index}>{index+1}</th>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.roles}</td>
                  <td>
                    <Link className="btn btn-primary mx-2" 
                    to={`/viewuser/${user.id}`}
                    >Подробнее</Link>

                    <Link className="btn btn-outline-dark mx-2"      
                    to={`/edituser/${user.id}`}
                    >Изменить</Link>

                    <button className="btn btn-danger mx-2"
                    onClick={()=>deleteUser(user.id)}
                    >Удалить</button>
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
