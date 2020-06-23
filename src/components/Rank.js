import React from 'react';

function Rank({ name, entries}) {
  return (
    <div>
      <h1 className='f1 tc purple'>
        {`Hi ${name}! Your current entry count is...`}
      </h1>
      <div className='f1 tc purple'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;