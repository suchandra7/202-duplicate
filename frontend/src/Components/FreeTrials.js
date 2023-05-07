import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";


function FreeTrials() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);
    const navigate = useNavigate();

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
            <div>{guserID}</div>
            <div>{guserRole}</div>
            <div>{guserEmail}</div>
            <div>{guserName}</div>
        </div>

    )
}

export default FreeTrials;