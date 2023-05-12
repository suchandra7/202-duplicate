import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";


function FreeTrials() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const [selectedMember, setselectedMember] = useState('Select a user');
    const [selectedDuration, setselectedDuration] = useState('1');
    const [members, setMembers] = useState([]);

    const navigate = useNavigate();

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

    const setMember = (e) => {
        const target = e.target;
        if (target.classList.contains('dropdown-item')) {
            setselectedMember(target.innerText);
        }
    }
    async function getMembers() {
        try {
            const response = await axios.get('http://52.40.70.166:3000/getnonmembers');
            console.log(response.data);
            setMembers(response.data);
            console.log(members);
        }
        catch {
            console.error('get members failed');
        }
    }

    useEffect(() => {
        getMembers();
    }, []);

    async function enrollMembers(event) {
        try {
            var details = { userId: selectedMember, months: selectedDuration }
            if(selectedMember=='Select a member' && selectedDuration=="Select a duration"){
                alert ("Please select member and duration");
                return;
            }
            else if (selectedMember=='Select a member'){
                alert ("Please select a member");
                return;
            }
            else if (selectedDuration=="Select a duration"){
                alert ("Please select duration");
                return;
            }
            const response = await axios.patch('http://52.40.70.166:3000/user/updateUserMembership', details);
            getMembers();
            setselectedMember('Select a member');

        }
        catch (error) {
            console.error('Enrollment unsuccessful', error.response.data);
        }
    }

    return (
        <div>
            <div className='row center'>
                <h1>
                    Select user to give free trial
                </h1>
            </div>
            <div className='row'>
                <div className='freetrial'>
                    <div className='center side'>
                        <h3> User</h3>
                        <div class="dropdown" onClick={setMember}>
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {selectedMember}
                            </button>
                            <ul class="dropdown-menu">
                                {
                                    members.map(member => (
                                        <li><a class="dropdown-item" >{member.userId}</a></li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div>
                        <button type="button" class="btn btn-success" onClick={enrollMembers}>Give free trial</button>
                    </div>
                </div>

            </div>
        </div>


    )
}

export default FreeTrials;