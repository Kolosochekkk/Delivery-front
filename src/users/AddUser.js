import axios from 'axios';
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {

    let navigate=useNavigate()

    const [user,setUser]=useState({
        login:"",
        password:"",
        name:"",
        username:"",
        email:"",
        role: 0
    })

    const{login, password, name,username,email, role}=user

    const onInputChange=(e)=>{
        setUser({ ...user,[e.target.name]: e.target.value});

    }

    const onRoleChange = (e) => {
        setUser({ ...user, role: parseInt(e.target.value) });
        };

        const onSubmit = async (e) => {
            e.preventDefault();
            await axios.post(`http://localhost:8080/user?role=${role}`, user);
            navigate("/home");
            };

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-2 mt-2'>
            <h4 className='text-center m-4'>Register User</h4>
            <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
                <label htmlFor='Login' className='form-label'>
                    Login
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Enter your login'
                name='login'
                value={login}
                onChange={(e)=>onInputChange(e)}
                />
            </div><div className='mb-3'>
                <label htmlFor='Password' className='form-label'>
                    Password
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Enter your password'
                name='password'
                value={password}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>
                    Name
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Enter your name'
                name='name'
                value={name}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='Username' className='form-label'>
                Username
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Enter your username'
                name='username'
                value={username}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='Email' className='form-label'>
                E-mail
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder='Enter your e-mail address'
                name='email'
                value={email}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
            <div>
        <label>Role</label>
        <div class="radio-group">
  <label>
    <input type="radio" name="role" value="0" checked={role === 0} onChange={onRoleChange} />
    User
  </label>
  <label>
    <input type="radio" name="role" value="1" checked={role === 1} onChange={onRoleChange} />
    Admin
  </label>
</div>

      </div>
            <button type='submit' className='btn btn-outline-primary'>Submit</button>
            <Link className='btn btn-outline-danger mx-2' to="/home">Cancel</Link>
            </form>
            </div>
        </div>
    </div>
  )
}
