import React from 'react';
import '../styles/catering.css';
import catering from '../images/catering.png';

export function Catering() {
  return (
    <div className="catering-container">
      <img src={catering} alt="Catering" className="catering-image" />
    </div>
  );
}
