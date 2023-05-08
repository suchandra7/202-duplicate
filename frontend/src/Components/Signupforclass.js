import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

function Signupforclass() {
    const [selectedLocation, setselectedLocation] = useState('Select a location');
    const { guserRole, setguserRole } = useContext(AuthContext);
    const { guserID, setguserID } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    const [classID, setClassID] = useState('');

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

    async function getClasses(location) {
        try {
            const response = await axios.get('http://localhost:3000/futureClasses/' + location);
            setClasses(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data', error.response.data);
        }
    };

    const setValue = (e) => {
        const target = e.target;
        if (target.classList.contains('dropdown-item')) {
            setselectedLocation(target.innerText);
            getClasses(target.innerText);
        }
    }
    async function bookClass(clickedClassID) {
        console.log(clickedClassID);
        try {
            var classs = { userId: guserID, classId: clickedClassID }
            const response = await axios.post('http://localhost:3000/bookClass', classs);
            
        } catch (error) {
            console.error('Error fetching data', error.response.data);
        }
    };

    return (
        <div>
            <div className='row'>
                <div className='center side'>
                    <h3>Seleced location</h3>
                    <div class="dropdown" onClick={setValue}>
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {selectedLocation}
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
                            <th scope="col">Book class</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        {
                            classes.map(x => (
                                <tr >
                                    <th scope="row">{x.className}</th>
                                    <td>{x.startTime}</td>
                                    <td>{x.endTime}</td>
                                    <td>{x.instructor}</td>
                                    <td><button type="button" class="btn btn-success" onClick={() => bookClass(x.classId)}><i class="fas fa-edit"></i>Book</button></td>
                                </tr>
                         ))
                        }
                    </tbody>
                </table>
            </div>
        </div>



    )
}

export default Signupforclass;