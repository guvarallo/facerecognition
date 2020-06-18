import React from 'react';
import './FaceRecognition.css';

function FaceRecognition({ url, box }) {
  return (
    <div className='tc ma4 mw-100'>
      <figure>
        <img src={url} alt='' id='img'/>
        <figcaption className='bounding-box' style={box}></figcaption>
      </figure>
    </div>
  );
}

export default FaceRecognition;