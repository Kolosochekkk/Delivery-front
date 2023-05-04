import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './layout/Navbar';

import Home from './pages/Home';
import Authorization from './pages/Authorization';
import UserHome from './pages/UserHome';
import Restaurant from './pages/Restaurant';
import Users from './pages/Users';
import Dishes from './pages/Dishes';
import ViewDish from './pages/ViewDish';
import Cart from './pages/Cart';
import Cabinet from './pages/Cabinet';
import Promocode from './pages/Promocode';
import Orders from './pages/Orders';
import UserOrder from './pages/UserOrder';
import Diagrams from './pages/Diagrams';


import AddPromocode from './promocode/AddPromocode';
import EditPromocode from './promocode/EditPromocode';

import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from "./users/ViewUser";
import Register from './users/Register.js';

import AddRestaurant from './restaurans/AddRestaurant.js';
import EditRestaurant from './restaurans/EditRestaurant';

import AddDish from './dishes/AddDish';
import EditDish from './dishes/EditDish';



function App() {
  return (
    <div className="App">
      
      <Router>
      <Navbar />
      <Routes>
      <Route exact path="/" element={<Authorization/>}/>
      <Route exact path="/register" element={<Register />} />

      <Route exact path="/home" element={<Home/>}/>
      <Route exact path="/userHome" element={<UserHome/>}/> 

      <Route exact path="/diagrams" element={<Diagrams/>}/> 

      <Route exact path="/orders" element={<Orders/>}/>
      <Route exact path="/userorder" element={<UserOrder/>}/> 

      <Route exact path="/cart" element={<Cart/>}/>
      <Route exact path="/cabinet" element={<Cabinet/>}/>

      <Route exact path="/restaurants" element={<Restaurant/>}/> 
      <Route exact path="/addrestaurant" element={<AddRestaurant />} />
      <Route exact path="/editrestaurant/:id" element={<EditRestaurant />} />

      <Route exact path="/dishes" element={<Dishes/>}/> 
      <Route exact path="/adddish" element={<AddDish/>}/>
      <Route exact path="/editdish/:id" element={<EditDish/>}/>
      <Route exact path="/viewdish/:id" element={<ViewDish/>}/>

      <Route exact path="/addUser" element={<AddUser/>}/>
      <Route exact path="/editUser/:id" element={<EditUser/>}/>
      <Route exact path="/viewuser/:id" element={<ViewUser />} />
      <Route exact path="/users" element={<Users />} />
      
      <Route exact path="/promocode" element={<Promocode/>}/> 
      <Route exact path="/addpromocode" element={<AddPromocode/>}/>
      <Route exact path="/editpromocode/:id" element={<EditPromocode/>}/>
        
      </Routes>
      </Router>
    </div>
  );
}

export default App;


/*import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

export default function AddDish() {
  const navigate = useNavigate();
  const [dish, setDishes] = useState({
    restaurantId: 0,
    name: '',
    price: 0
    
  });

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');

  const { name, price } = dish;

  const onInputChange = (e) => {
    setDishes({ ...dish, [e.target.name]: e.target.value });
  };

  const onRestaurantSelect = (e) => {
    setSelectedRestaurant(e.target.value);
    setDishes({ ...dish, restaurantId: e.target.value });
  };

  //formData.append("photos", e.target.photos.files[0]);
  const onSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('photo',  e.target.photo.files[0]);
    formData.append('dish', new Blob([JSON.stringify(dish)], {
      type: 'application/json'
    }));
  
    await axios.post(`http://localhost:8080/restaurant/${selectedRestaurant}/dish`, formData, {

      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    navigate('/dishes');
  };
    useEffect(() => {
    const fetchRestaurants = async () => {
      const result = await axios.get('http://localhost:8080/restaurants');
      setRestaurants(result.data);
    };
    fetchRestaurants(); }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-2 mt-2">
          <h4 className="text-center m-4">Добавить блюдо</h4>
          <form onSubmit={(e) => onSubmit(e)} enctype="multipart/form-data">
          <div className="form-group">
          <label htmlFor="restaurant">Ресторан</label>
          <select
            className="form-control"
            id="restaurant"
            name="restaurantId"
            value={selectedRestaurant}
            onChange={onRestaurantSelect}
          >
            <option value="">Выберите ресторан</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Название
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Введите название блюда"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Стоимость
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Введите стоимость"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Изображение блюда
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
            <Link className="btn btn-outline-danger mx-2" to="/dishes">Отмена</Link>
</form>
</div>
</div>
</div>
);
}
*/