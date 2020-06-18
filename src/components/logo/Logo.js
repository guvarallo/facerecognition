import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo_transparent.png';
import './Logo.css'

function Logo() {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 25, perspective: 400 }}>
        <div className="Tilt-inner"><img alt='logo' src={logo}/></div>
      </Tilt>
    </div>
  );
}

export default Logo;