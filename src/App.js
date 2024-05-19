// import logo from './logo.svg';
import './index.css';
import './App.css';
// import Header from './Header';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Menubot from './MenuBot';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Cardd } from './Cardd';
import { Carousel } from './components/Carousel';
import { slides } from './data/carousel';

import Navbar from './Navbar';
import User from './User';

function App() {
  return (
    <Router>
      <div className='container'>
      <div className="App">
        <Navbar />
      </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menubot" element={<Menubot />} />
          <Route path="/userguide" element={<User/>} />
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
