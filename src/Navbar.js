import React from 'react';
import { Link } from 'react-router-dom';
import User from './User';
import Home from './Home';

export default function Navbar() {
  return (
    <div className='navbar'>
      <nav>
        <button><Link to="/">Home</Link></button>
        <button><Link to="/register">Sign up</Link></button>
        <button><Link to="/login">Login</Link></button>
        <button><Link to="/userguide">User Guide</Link></button>
      </nav>
    </div>
  );
}
