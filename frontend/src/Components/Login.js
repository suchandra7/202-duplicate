import React, { useState } from 'react';
import axios from 'axios';

function Login() {


    const [password,setPassword] = useState('');
    const [userID,setuserID] = useState('');

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "userID"){
            setuserID(value);
        }
        if(id === "password"){
            setPassword(value);
        }

    }
    
    const handleSubmit = () => {
        var user_details = { userId : userID, password : password} 
        axios.post("http://localhost:3000/login",user_details).then((response)=>{
            alert('registered successfully');
            console.log(response);
        });
    };

    return (
        <div className='grid'>
            <div className='g-col-6'>
                <form>
                <div className="mb-3">
                        <label htmlFor="exampleInputuserID" className="form-label">User ID </label>
                        <input type="text" min="4" className="form-control" id="userID" value={userID} onChange = {(e) => handleInputChange(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" min="4" className="form-control" id="password" value={password} onChange = {(e) => handleInputChange(e)} />
                    </div>
                   
                    <button onClick={()=>handleSubmit()} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default Login;