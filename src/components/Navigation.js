import React from 'react';

function Navigation() {
  return (
    <nav style={{display: 'flex', justifyContent: 'flex-end', zIndex: '1'}}>
      <a className='f6 fl hover-bg-purple hover-white b--purple link ba dib purple pa4 ma2 pv2' href='#0'>Sign out</a>
    </nav>
  );
}

export default Navigation;