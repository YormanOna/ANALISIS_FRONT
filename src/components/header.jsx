import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../styles/header.css';

export function Header() {
  return (
    <header className="header">
      <Link to="/" className='header-img2'>
        <img src={logo} alt="logo 1" />
      </Link>
      <div>
        <h1>Banana's Cocktails</h1>
        <p>Servicio de Bartender y Catering</p>
      </div>
    </header>
  );
}
