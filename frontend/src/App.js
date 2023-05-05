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

          <Register> </Register>
      </div>

    </div>
  );
}

export default App;
