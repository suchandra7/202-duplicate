import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';


const LogHours= () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const { guserRole, setguserRole } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(guserRole == ''){
        navigate('/');
    }
    else if(guserRole == 'admin'){
        navigate('/enrollusers');
    }
    else if(guserRole == 'Non Member'){
        navigate('/nonmember');
    }
}, [guserRole]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create an object with the form data
    const formData = {
      selectedOption: selectedOption,
      startTime: startTime,
      endTime: endTime,
    };
  
    // Make a POST request to the backend endpoint
    fetch('backend-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log('Response from backend:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label class="form-label ">  
        Machine:
        <select class="form-select" value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </label>
      <br />
      <label>
        Start Time:
        <input type="time" value={startTime} onChange={handleStartTimeChange} />
      </label>
      <br />
      <label>
        End Time:
        <input type="time" value={endTime} onChange={handleEndTimeChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LogHours;
