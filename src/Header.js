import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="nav-div">
      <nav className="MyNavbar">
        <Link to="/" className="nav-link active">GOVBOT</Link>
        <div id="navbarText">
          <Link to="/" className="nav-link active"><button className="btn">User Guide</button></Link>  
          <Link to="/register" className="nav-link active"><button className="btn">Sign Up</button></Link>
          <Link to="/login" className="nav-link active"><button className="btn">Login</button></Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
