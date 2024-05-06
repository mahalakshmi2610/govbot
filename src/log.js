import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check session status when the app loads
    axios.get('http://localhost:5000/session', { withCredentials: true })
      .then(res => {
        setLoggedIn(res.data.loggedIn);
      });
  }, []);

  const handleLogin = () => {
    // Login logic
    axios.post('http://localhost:5000/login', { username: 'example_user', password: 'example_password' }, { withCredentials: true })
      .then(res => {
        setLoggedIn(true);
      });
  };

  const handleLogout = () => {
    // Logout logic
    axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
      .then(res => {
        setLoggedIn(false);
      });
  };

  return (
    <div>
      {loggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      {loggedIn ? <p>Welcome, example_user!</p> : <p>Please log in.</p>}
    </div>
  );
};

export default App;
