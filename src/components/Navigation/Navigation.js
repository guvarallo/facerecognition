import React from 'react';

function Navigation({ handleRouteChange, isSignedIn }) {
  return (
    isSignedIn === true
    ? <nav className='tc absolute right-0 top-0'>
        <a onClick={() => handleRouteChange('signin')} className='f6 fl grow hover-bg-purple hover-white b--purple link ba dib purple pa4 ma2 pv2' href='#0'>Sign out</a>
      </nav>
    : ''
  );
}

export default Navigation;