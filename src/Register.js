import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import chatImage from "./farmer.jpg";

const Register = () => {
  const history = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    const sendData = {
      username: data.username,
      password: data.password
    };

    axios.post('http://localhost/govbotreactphp/insert.php', sendData)
      .then((result) => {
        console.log(result);
        if (result.data.status === 'valid') {
            history('/login');
          } else {
            setError("Invalid User");
          }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div class="outer-box">
      <div className="main-box">
        <div className="image-container">
          <img src={chatImage} alt="Registration" />
        </div>
        <form onSubmit={submitForm} className="form-container">
          <h1 id="regId">Register</h1>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" className="form-control" onChange={handleChange} value={data.username} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} value={data.password} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} value={data.confirmPassword} />
          </div>
          <button type="submit" className="btn btn-success">Register</button>
          {error && <div className="text-danger">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;
