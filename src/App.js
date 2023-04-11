import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from "./users/ViewUser";
import Authorization from './pages/Authorization';
import UserHome from './pages/UserHome';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
      <Route exact path="/" element={<Authorization/>}/>
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path="/userHome" element={<UserHome/>}/> 
        <Route exact path="/addUser" element={<AddUser/>}/>
        <Route exact path="/editUser/:id" element={<EditUser/>}/>
        <Route exact path="/viewuser/:id" element={<ViewUser />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
