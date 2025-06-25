import './App.css';
import Main from './pages/mainpage/Main'; 
import Login from './pages/loginpage/Login';
import Register from './pages/registerpage/Register';
import Monitor from './component/Add_website/AddWebsite';
import Details from './component/AccountDetails/Details';
import Listing from './component/Listing/Listing';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />      
      <Route path="/home" element={<Main />} />
      <Route path="/monitor" element={<Monitor />} />
      <Route path="/detail" element={<Details />} />
      <Route path="/listing" element={<Listing />} />
    </Routes> 

  );
}

export default App;
