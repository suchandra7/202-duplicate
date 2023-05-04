import React, { useState } from 'react';
import axios from 'axios';

function Register() {

    const getJoke = () => {
        axios.get("https://official-joke-api.appspot.com/random_joke").then(
            (response) => {
            console.log(response);
            }
        );
    };

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [userID,setuserID] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "name"){
            setName(value);
        }
        if(id === "userID"){
            setuserID(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }

    }
    
    const handleSubmit = () => {
        user_details = { userId : userID, name : name, email : email, password : password} 
        axios.post("",user_details).then((response)=>{
            alert('registered successfully');
            console.log(response);
        });
    };

    return (
        <div className='grid'>
            <div className='g-col-6'>
                <form>
                <div class="mb-3">
                        <label for="exampleInputuserID" class="form-label">User ID </label>
                        <input type="text" class="form-control" id="userID" value={userID} onChange = {(e) => handleInputChange(e)} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputName" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="name" value={name} onChange = {(e) => handleInputChange(e)} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" value={email}  onChange = {(e) => handleInputChange(e)} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" value={password} onChange = {(e) => handleInputChange(e)} />
                    </div>
                   
                    <button onClick={()=>handleSubmit()} type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default Register;