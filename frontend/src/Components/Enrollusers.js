import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';
function Enrollusers() {
    const navigate = useNavigate();

    const [selectedV, setselectedV] = useState();
    const [selectedV1, setselectedV1] = useState();
    const { guserRole, setguserRole } = useContext(AuthContext);
    const [selectedV2, setselectedV2] = useState();

    async function getMembers(){
        try{
            const response = await axios.get('http://localhost:3000/getnonmembers');
            console.log(response.data);
            setselectedV(response.data);
        }
        catch{
            console.error('get members failed');
        }
    }
    useEffect(() => {
        if(guserRole == ''){
            navigate('/');
        }
        else if(guserRole == 'member'){
            navigate('/member');
        }
        else if(guserRole == 'Non Member'){
            navigate('/nonmember');
        }
    }, [guserRole]);

    async function enrollMembers(event){
        try{
            var details = {userId: selectedV2, months:selectedV1}
            const response = await axios.patch('http://localhost:3000/user/updateUserMembership', details);
            console.log(response.data);
            navigate('/enrollusers');
        }
        catch(error){
            console.error('Enrollment unsuccessful', error.response.data);
        }
    }
    useEffect(() => {
       getMembers();
    }, []);

    return (
        <div className='row'>
            <div className='col'>
                Members <select onChange={e => setselectedV2(e.target.value)}>
                <option value="none" selected disabled hidden>
                    </option>
                {selectedV?.map(selectedValue => <option>{selectedValue.userId}</option>)}
                </select>
            </div>
            <div className='col'>
                Time Period in Months <select value={selectedV1} onChange={e => setselectedV1(e.target.value)}>
                    <option value="none" selected disabled hidden>
                    </option>
                    <option>3</option>
                    <option>6</option>
                    <option>12</option>
                </select>
            </div>
            <div className='col'>
            <button type="button" class="btn btn-success" onClick={enrollMembers}>Enroll</button>
            </div>
        </div> 
    )
}

export default Enrollusers;