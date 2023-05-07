import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";
const API = 'http://localhost:3000/futureClass/';


const Schedule = () => {
    const [users, setUsers] = useState([]);
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    const [scheduleData, setscheduleData] = useState({
        className: "",
        classId: "",
        location: "",
        startTime: "",
        endTime: "",
        instructor: ""
    });

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

    async function fetchUsers() {
        try {
            fetch(API + guserID)
                .then((response) => response.json())
                .then((json) => setUsers(json))
        }

        catch {
            console.error('get members failed');
        }
    }

    useEffect(() => {
        if (guserID == '') {
            navigate('/login');

        }
        else {
            fetchUsers();
        }
    }, [guserID]);
    return (
        <div>
            <div class="row center">
                <h1>Future Bookings </h1>
                <div className='row'>
                    <table class="table table-hover">
                        <thead class="table-dark">
                            <tr>
                                <th>Class Name</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Instructor Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(currSchedule => (
                                    <tr>
                                        <td>{currSchedule.className}</td>
                                        <td>{currSchedule.location}</td>
                                        <td>{JSON.stringify(currSchedule.startTime).substring(1, 11)}</td>
                                        <td>{currSchedule.startTime}</td>
                                        <td>{currSchedule.endTime}</td>
                                        <td>{currSchedule.instructor}</td>
                                    </tr>

                                ))
                            }
                            {/* {
                scheduleData((currSchedule) => {
                
                        <tr>
                            <td>{currSchedule.className}</td>
                            <td>{currSchedule.location}</td>
                            <td>{currSchedule.startTime}</td>
                            <td>{currSchedule.endTime}</td>
                            <td>{currSchedule.startTime}</td>
                            <td>{currSchedule.instructor}</td>
                        </tr>
                    
                })
            } 
             */}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>



    )
}

export default Schedule;