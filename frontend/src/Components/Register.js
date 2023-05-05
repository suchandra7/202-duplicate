import React, { useState } from 'react';
import axios from 'axios';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userID, setuserID] = useState('');

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === "name") {
            setName(value);
        }
        if (id === "userID") {
            setuserID(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }

    }

    const handleSubmit = () => {
        var user_details = { userId: userID, name: name, email: email, password: password }
        axios.post("http://localhost:3000/addUser", user_details).then((response) => {
            alert('registered successfully');
            console.log(response);
        });
    };

    return (

        <form>
            <div class="mb-3">
                <label htmlFor="exampleInputuserID" className="form-label">User ID </label>
                <input type="text" min="4" class="form-control" id="userID" value={userID} onChange={(e) => handleInputChange(e)} />
            </div>
            <div class="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Full Name</label>
                <input type="text" min="4" class="form-control" id="name" value={name} onChange={(e) => handleInputChange(e)} />
            </div>
            <div class="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" min="4" class="form-control" id="email" value={email} onChange={(e) => handleInputChange(e)} />
            </div>
            <div class="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" min="4" class="form-control" id="password" value={password} onChange={(e) => handleInputChange(e)} />
            </div>

            <button onClick={() => handleSubmit()} type="submit" className="btn btn-primary">Submit</button>
        </form>

    )
}

export default Register;