import React, { useState } from 'react';

const CheckInOut = () => {
  const [userId, setUserId] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleCheckInTimeChange = (e) => {
    setCheckInTime(e.target.value);
  };

  const handleCheckOutTimeChange = (e) => {
    setCheckOutTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the check-in/check-out data
    const checkInOutData = {
      userId: userId,
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
    };

    // Send the check-in/check-out data to the backend
    fetch('backend-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkInOutData),
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
      <label>
        User ID:
        <input type="text" value={userId} onChange={handleUserIdChange} />
      </label>
      <br />
      <label>
        Check-In Time:
        <input
          type="datetime-local"
          value={checkInTime}
          onChange={handleCheckInTimeChange}
          disabled={checkInTime !== ''}
        />
      </label>
      <br />
      <label>
        Check-Out Time:
        <input
          type="datetime-local"
          value={checkOutTime}
          onChange={handleCheckOutTimeChange}
          disabled={checkInTime === ''}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CheckInOut;
