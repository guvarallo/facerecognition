import React from 'react';

function Navigation() {
  return (
    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <a className='f6 fl grow hover-bg-purple hover-white b--purple link ba dib purple pa4 ma2 pv2' href='#0'>Sign out</a>
    </nav>
  );
}

export default Navigation;