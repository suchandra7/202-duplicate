import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';


const LogHours = () => {
  const [selectedOption, setSelectedOption] = useState('select Machine');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const { guserRole, setguserRole } = useContext(AuthContext);
  const { guserId, setguserId } = useContext(AuthContext);
  const navigate = useNavigate();
  const API = 'http://localhost:3000/addlogMachineTracking'
  useEffect(() => {
    if (guserRole == '') {
      navigate('/');
    }
    else if (guserRole == 'admin') {
      navigate('/enrollusers');
    }
    else if (guserRole == 'Non Member') {
      navigate('/nonmember');
    }
  }, [guserRole]);

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const setValue = (e) => {
    const target = e.target;
    if (target.classList.contains('dropdown-item')) {
      setSelectedOption(target.innerText);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      userId: guserId,
      machineName: selectedOption,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    };

    if( !selectedOption || !startTime || !endTime)
    {
      alert("Please fill out all fields");
      return;
    }

    // Make a POST request to the backend endpoint
    fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        alert("submitted successfully");
        setSelectedOption('select Machine');
        setEndTime('');
        setStartTime('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  return (
    <form className="form-container" style={{paddingTop:'50px'}} onSubmit={handleSubmit}>
      <div className="form-group">

        <div className='row'>
          <div className='center side'>
            <h5> Machine</h5>
            <div class="dropdown"  onClick={setValue}>
              <button class="btn btn-secondary dropdown-toggle" style = {{width:'210px'}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedOption}
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" >Thread Mill</a></li>
                <li><a class="dropdown-item" >Leg Extension</a></li>
                <li><a class="dropdown-item" >Stationary Bicycle</a></li>
                <li><a class="dropdown-item" >Dumbbell</a></li>
                <li><a class="dropdown-item" >Battle Ropes</a></li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <div className="form-group">
      <div className="row">
        <div className='center side'>
        <h5>Start Time:</h5>
        <input class="ip2" style = {{width:'210px'}}
          type="datetime-local"
          id="startTime"
          value={startTime}
          onChange={handleStartTimeChange}
        />
        </div>
      </div>
      </div>

      <div className="form-group">
      <div className="row">
        <div className='center side'>
        <h5>Start Time:</h5>
        <input class="ip2" style = {{width:'210px'}}
          type="datetime-local"
          id="endTime"
          value={endTime}
          onChange={handleEndTimeChange}
        />
        </div>
        </div>
      </div>
      <br></br>
      <div className="form-group">
      <div className="row">
        <div className='center side'>
      <button type="submit" class="btn btn-success"><i class="fas fa-edit"></i>Submit</button>
      </div>
      </div>
      </div>
    </form>

  );
};

export default LogHours;
