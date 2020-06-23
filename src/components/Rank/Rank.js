import React from 'react';
import './Rank.css'

function Rank({ name, entries}) {
  return (
    <div className='rank'>
      <h1 className='f1 tc purple'>
        {`Hi ${name}!`}
      </h1>
      <h2 className='f2 tc purple'>Your current entry is:</h2>
      <div className='f2 tc purple'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;