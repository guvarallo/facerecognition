import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Particles from 'react-particles-js';
import Logo from './components/logo/Logo';
import Rank from './components/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '78d528812599487e96494d1858567da5'
 });

const particlesSettings = {
  particles: {
    move: {
      speed: 5
    },
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
}

function App() {
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');
  const [box, setBox] = useState({ 
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  });

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit() {
    setUrl(input);

    app.models
      .predict('a403429f2ddf4b49b307e318f00e528b', input)
      .then(response => faceBox((response.outputs[0].data.regions[0].region_info.bounding_box)))
      .catch(err => alert('Please insert a valid image URL - ' + err));
  }

  function faceBox(data) {
    const image = document.getElementById('img');
    const height = image.height;
    const width = image.width;
    const top = parseInt(data.top_row * height) + 'px';
    const left = parseInt(data.left_col * width) + 'px';
    const bottom = height - (parseInt(data.bottom_row * height)) + 'px';
    const right = width - (parseInt(data.right_col * width)) + 'px';
    setBox({...box,
      top: top,
      left: left,
      bottom: bottom,
      right: right,
    });
  }

  console.log(box);

  return (
    <div className="App">
      <Navigation />
      <Particles className='particles' params={particlesSettings} />
      <Logo />
      <Rank />
      {/* Have to add value={input} below for the input to be captured */}
      <ImageLinkForm value={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
      <FaceRecognition url={url} box={box}/>
    </div>
  );
}

export default App;
