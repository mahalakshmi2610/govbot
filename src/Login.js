import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const data={uname:username,pass:password};
    
    axios.post('http://localhost/govbotreactphp/login.php',data)
      .then((response) => {
        if (response.data.status === 'success') {
            history('/menubot'); // Redirect to chatbot component
        } else {
            console.error('Login Error:', response.data.message);
            alert('Login failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Login Error:', error);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit"  className="btn btn-success" >Login</button>
        </form>
    </div>
  );
}

export default Login;
