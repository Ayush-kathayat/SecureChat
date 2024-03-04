
// import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Navbar = () => {
  return (
    <nav className='nav'>
      <a href="/"className="site-title">SecureChat</a>
      <ul>
        <li>
          <a href="/home" className="link">Home</a>
        </li>
        <li >
          <a href="/chat" className="link" >Chat</a>
        </li>
        <li>
          <a href="/settings" className="link">Settings</a>
        </li>
        <li>
          <a href="/about" className="link">About</a> 
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
