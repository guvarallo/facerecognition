import React from 'react';

function FaceRecognition({ url }) {
  return (
    <div className='tc pt3'>
      <img src={url} alt=''/>
    </div>
  );
}

export default FaceRecognition;