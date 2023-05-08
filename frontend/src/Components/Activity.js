import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';

function Activity() {
  const { guserID, setguserID } = useContext(AuthContext);
  const { guserRole, setguserRole } = useContext(AuthContext);
  const [classesData, setclassesData] = useState([]);
  const [machineData, setmachineData] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const navigate = useNavigate();

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

  async function getActivities(event) {
    try {
      const data = {
        userId: guserID,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      };
      const classes = await axios.post('http://localhost:3000/activityHoursSpent', data);
      const machine = await axios.post('http://localhost:3000/machineHoursSpent', data);
      setclassesData(classes.data);
      setmachineData(machine.data);
      console.log(classes.data);
      console.log(machine.data);
    } catch (error) {
      console.error('Error fetching data', error.response.data);
    }
  };


  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };


  return (
    <div>
      <div>
        <div className="form-group">
          <div className="row">
            <div className='center side'>
              <h5>Start Time:</h5>
              <input class="ip2" style={{ width: '210px' }}
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
              <input class="ip2" style={{ width: '210px' }}
                type="datetime-local"
                id="endTime"
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='center side'>
          <button type="submit" className="btn btn-success center" onClick={getActivities}><i class="fas fa-edit"></i>Submit</button>
        </div>
      </div>

      <div className='row center'>
        <h1>Class Activity</h1>
      </div>
      <div className="row">
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='row center'>
        <h1>Machine Activity</h1>
      </div>
    </div>
  )
}

export default Activity;