import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container } from 'react-bootstrap';

function Enrollusers() {
    const [selectedV, setselectedV] = useState();
    const [selectedV1, setselectedV1] = useState();

    async function getMembers(){
        try{
            const response = await axios.get('http://localhost:3000/user');
            console.log(response.data);
            setselectedV(response.data);
        }
        catch{
            console.error('get members failed');
        }
    }

    useEffect(() => {
       getMembers();
    }, []);

    //const options = [];
    //for (let i=0; i <=selectedV.length; i +=1) options.push(i);

    return (
        <div className='row'>
            <div className='col-3'>
                Members <select>
                <option>
          </option>
                </select>
            </div>
            <div className='col-3'>
                Time Period <select value={selectedV1} onChange={e => setselectedV1(e.target.value)}>
                    <option value="none" selected disabled hidden>
                    </option>
                    <option></option>
                </select>
            </div>
            <div className='col-3'>
            <button type="button" class="btn btn-success">Enroll</button>
            </div>
        </div> 
    )
}

export default Enrollusers;