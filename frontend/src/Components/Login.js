import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';

function Login() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);


    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [userID, setuserID] = useState('');

    useEffect(() => {
        if(guserRole == 'Member'){
            navigate('/profile');
        }
        else if(guserRole == 'admin'){
            navigate('/');
        }
    }, [guserRole]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "userID") {
            setuserID(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        var user_details = { userId: userID, password: password }
        try {
            const response = await axios.post('http://localhost:3000/user/validate', user_details);
            console.log('login successful!', response.data);
            setguserID(response.data.userId);
            setguserRole(response.data.role);
            setguserEmail(response.data.email);
            setguserName(response.data.name);
            if(guserRole == 'Member'){
                navigate('/profile');
            }
            else if(guserRole == 'admin'){
                navigate('/');
            }
            else{
                navigate('/nonmember');
            }
        } catch (error) {
            console.error('login failed!', error.response.data);
        }
    };

    return (
        <div className='row'>
            <div className='col-6 offset-3'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputuserID" className="form-label">User ID </label>
                        <input type="text" min="4" className="form-control" id="userID" value={userID} onChange={(e) => handleInputChange(e)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" min="4" className="form-control" id="password" value={password} onChange={(e) => handleInputChange(e)} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div>{guserID}</div>
                <div>{guserRole}</div>
                <div>{guserEmail}</div>
                <div>{guserName}</div>
            </div>
        </div>

    )
}

export default Login;