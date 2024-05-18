import React from 'react'
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';

import User from './User';
import Home from './Home';
export default function Navbar() {
  return (
    <div className='navbar'>
        <Router>
      <nav>
      <button><Link to="/home">Home</Link></button>
        <button>Sign up</button>
        <button>Login</button>
        <button><Link to="/userguide">User Guide</Link></button>
      </nav>
      <Routes>
      <Route path="/home" element={<Home /> }/>
        <Route path="/userguide" element={<User /> }/>
      </Routes>
    </Router>
    </div>
  )
}
