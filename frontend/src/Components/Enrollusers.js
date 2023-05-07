import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';
function Enrollusers() {

    const [selectedMember, setselectedMember] = useState('Select a member');
    const [selectedDuration, setselectedDuration] = useState('Select a duration');
    const [members, setMembers] = useState();
    const navigate = useNavigate();

    const { guserRole, setguserRole } = useContext(AuthContext);
    const [selectedV2, setselectedV2] = useState();

    async function getMembers() {
        try {

            const response = await axios.get('http://localhost:3000/getnonmembers');
            console.log(response.data);
            setMembers(response.data);
        }
        catch {
            console.error('get members failed');
        }
    }
    useEffect(() => {
        if (guserRole == '') {
            navigate('/');
        }
        else if (guserRole == 'member') {
            navigate('/member');
        }
        else if (guserRole == 'Non Member') {
            navigate('/nonmember');
        }
    }, [guserRole]);

    async function enrollMembers(event){
        try{
            var details = {userId: selectedMember, months:selectedDuration}
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

    const setMember = (e) => {
        const target = e.target;
        if (target.classList.contains('dropdown-item')) {
            setselectedMember(target.innerText);
        }
    }
    const setDuration = (e) => {
        const target = e.target;
        if (target.classList.contains('dropdown-item')) {
            setselectedDuration(target.innerText);
        }
    }

    return (
        <div className='row'>
            <div className='enroll'>
                <div className='center side'>
                    <h3> Member</h3>
                    <div class="dropdown" onClick={setMember}>
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {selectedMember}
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

                <div className='center side'>
                    <h3>Duration</h3>
                    <div class="dropdown" onClick={setDuration}>
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {selectedDuration}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" >3 </a></li>
                            <li><a class="dropdown-item" >6</a></li>
                            <li><a class="dropdown-item" >12</a></li>
                        </ul>
                    </div>
                </div>

                <div>
                    <button type="button" class="btn btn-success">Enroll</button>
                </div>
            </div>

        </div>
    )
}

export default Enrollusers;