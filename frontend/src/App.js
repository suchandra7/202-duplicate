import logo from './logo.svg';
import './App.css';
import Navigationbar from './Components/Navigationbar';
import Register from './Components/Register';
import Login from './Components/Login';




function App() {
  return (
    <div className="App">
      <Navigationbar>

      </Navigationbar>
      <div className='container'>
        <div className='row'>
          <div className='col-6 offset-3'>
          <Register> </Register>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
