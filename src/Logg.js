import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const myLogin = async (data) => {
    try {
        const response = await axios.post('http://localhost/govbotreactphp/login.php', data);
        return response.data.status;
    } catch (error) {
        console.error('Login Error:', error);
        alert('An error occurred. Please try again.');
        return 'error';
    }
}

function Logg() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const data = { uname: username, pass: password };
        const success = await myLogin(data);

        if (success === 'success') {
            console.log("success");
            navigate('/menubot'); // Redirect to chatbot component
        } else {
            console.log("error");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="btn btn-success">Login</button>
            </form>
        </div>
    );
}

export default Logg;
