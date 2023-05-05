import logo from './logo.svg';
import './App.css';
import Navigationbar from './Components/Navigationbar';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import Profile from './Components/Profile';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navigationbar>

      </Navigationbar>
      <div className='container'>
        <Routes>
        <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
