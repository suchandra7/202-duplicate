import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';

function Activity() {
  const { guserID, setguserID } = useContext(AuthContext);
  const { guserRole, setguserRole } = useContext(AuthContext);
  const [classesData, getclassesData] = useState([]);
  const [machineData, getmachineData] = useState([]);
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
      // const classes = await axios.get('http://localhost:3000/membershipPlan');
      // const machine = await axios.get
      // setmembershipPlans(response.data);
      // console.log(membershipPlans);
    } catch (error) {
      console.error('Error fetching data', error.response.data);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);



  return (
    <div>
      <div className='row center'>
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
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Activity;