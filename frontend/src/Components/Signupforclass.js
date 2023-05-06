import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Signupforclass() {
    const [selectedValue, setselectedValue] = useState();
    return (
        <div>
        <div className='row'>
            <div className='col'>
                Location <select value={selectedValue} onChange={e => setselectedValue(e.target.value)}>
                    <option value="none" selected disabled hidden>
                    </option>
                    <option>San jose</option>
                    <option>Santa Clara</option>
                    <option>Milpitas</option>
                    <option>Sunyvale</option>
                    <option>Mountain View</option>
                </select>
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
        </div>

       
                
    )
}

export default Signupforclass;