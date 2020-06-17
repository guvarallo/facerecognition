import React from 'react';
import './ImageLinkForm.css';

function ImageLinkForm() {
  return (
    <div>
      <p className='tc fw7'>Insert your image url below:</p>
      <div className='form-inline'>
        <input type='text' size='50' className='pa2'></input>
        <a className='f6 fl hover-bg-purple hover-white b--purple link ba dib purple pa4 ma1 pv2' href='#0'>Submit</a>
      </div>
    </div>
  );
}

export default ImageLinkForm;