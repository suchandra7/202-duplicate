import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";

function Noofvisitors() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);
    const navigate = useNavigate();

    const data = [67, 15, 83, 94, 22, 61, 45, 70, 23, 31, 80, 3, 76, 58, 99, 8, 45, 60, 84, 52, 96, 69, 29, 86, 52, 19, 97, 9, 50, 91];
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
    
    return (
        <div>
            <div className='row center'>
            <h1>
                No of visitors
            </h1>
            </div>
        </div>

    )
}

export default Noofvisitors;