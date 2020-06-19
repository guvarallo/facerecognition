import React from 'react';
import './FaceRecognition.css';

function FaceRecognition({ url, box }) {

  return (
    <div className='tc ma4 mw-100'>
      <div className='faces'>
        <img src={url} alt='' id='img'/>
        {box.map((b, i) => (<div key={i} className='bounding-box' style={b}></div>))}
      </div>
    </div>
  );
}

export default FaceRecognition;