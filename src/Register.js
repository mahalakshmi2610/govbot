import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import bcrypt from "bcryptjs";
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

    // const hashedPassword = bcrypt.hashSync(data.password.toLowerCase(), 10);

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
    <div className="main-box">
      <div className="image-container">
        <img src={chatImage} alt="Registration" />
      </div>
      <form onSubmit={submitForm} className="form-container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Register</h1>
          </div>
          <div className="row">
            <div className="col-md-6">Username</div>
            <div className="col-md-6">
              <input type="text" name="username" className="form-control" onChange={handleChange} value={data.username} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">Password</div>
            <div className="col-md-6">
              <input type="password" name="password" className="form-control" onChange={handleChange} value={data.password} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">Confirm Password</div>
            <div className="col-md-6">
              <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} value={data.confirmPassword} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 text-center">
              <input type="submit" name="submit" value="Register" className="btn btn-success" />
            </div>
          </div>

          {error && <div className="row"><div className="col-md-12 text-center text-danger">{error}</div></div>}

        </div>
      </form>
    </div>
  );
};

export default Register;
