import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

function Signupforclass() {
    const [selectedValue, setselectedValue] = useState('Select a location');
    const { guserRole, setguserRole } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
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

    async function getClasses(event) {
        try {
            const response = await axios.get('http://localhost:3000/class');
            setClasses(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data', error.response.data);
        }
    };

    useEffect(() => {
        getClasses();
    }, []);

    const setValue = (e) => {
            const target = e.target;
            if (target.classList.contains('dropdown-item')) {
              setselectedValue(target.innerText);
            }
    }

    return (
        <div>
            <div className='row'>
                <div className='center side'>
                    <h3>Seleced location</h3>
                    <div class="dropdown" onClick={setValue}>
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {selectedValue}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" >Mountain View</a></li>
                            <li><a class="dropdown-item" >Sunyvale</a></li>
                            <li><a class="dropdown-item" >Milpitas</a></li>
                            <li><a class="dropdown-item" >San jose</a></li>
                            <li><a class="dropdown-item" >Santa clara</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='row'>
                <table class="table">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Class</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Instructor Name</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr>
                            <th scope="row">Boxing</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td></td>
                            <td><button type="button" class="btn btn-success"><i class="fas fa-edit"></i>Book</button></td>
                        </tr>
                        <tr>
                            <th scope="row">Cardio</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td><button type="button" class="btn btn-success"><i class="fas fa-edit"></i>Book</button></td>
                        </tr>
                        <tr>
                            <th scope="row">Strength</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            <td><button type="button" class="btn btn-success"><i class="fas fa-edit"></i>Book</button></td>
                        </tr>
                        <tr>
                            <th scope="row">Yoga</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            <td><button type="button" class="btn btn-success"><i class="fas fa-edit"></i>Book</button></td>
                        </tr>
                        <tr>
                            <th scope="row">Zumba</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            <td><button type="button" class="btn btn-success"><i class="fas fa-edit"></i>Book</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>



    )
}

export default Signupforclass;