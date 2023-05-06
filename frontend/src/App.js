import logo from './logo.svg';
import './App.css';
import Navigationbar from './Components/Navigationbar';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Activity from './Components/Activity';
import Signupforclass from './Components/Signupforclass';
import { Routes, Route } from "react-router-dom";
import { AuthContext } from './context/AuthProvider';
import { useState } from 'react';
import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";

function App() {
  const [guserID, setguserID] = useState('');
  const [guserRole, setguserRole] = useState('');
  const [guserEmail, setguserEmail] = useState('');
  const [guserName, setguserName] = useState('');

  return (
    <AuthContext.Provider value={{guserID, setguserID,guserRole, setguserRole,guserEmail, setguserEmail,guserName, setguserName}}>
    <div className="App">
      <Navigationbar>
      </Navigationbar>
      <div className='container'>
        <Routes>
        <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/activity" element={<Activity />} />
          <Route exact path="/signupforclass" element={<Signupforclass />} />
        </Routes>
      </div>
    </div>
    </AuthContext.Provider>
  );
}

//     <AuthContext.Provider value={{ userId : [userId, setuserId], userRole : [userRole, setuserRole]}}>

export default App;
