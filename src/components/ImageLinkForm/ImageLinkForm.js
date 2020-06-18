import React from 'react';
import './ImageLinkForm.css';

function ImageLinkForm({ handleInputChange, handleSubmit }) {
  return (
    <div>
      <p className='tc fw7'>Insert your image URL below:</p>
      <div className='form-inline'>
        <input type='text' size='50' className='pa2' onChange={handleInputChange}></input>
        <a className='f6 fl grow hover-bg-purple hover-white b--purple link ba dib purple pa4 ma1 pv2' href='#0' onClick={handleSubmit}>Submit</a>
      </div>
    </div>
  );
}

export default ImageLinkForm;