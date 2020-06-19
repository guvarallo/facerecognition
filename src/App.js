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
  const [box, setBox] = useState([]);

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit() {
    setUrl(input);

    app.models
      .predict('a403429f2ddf4b49b307e318f00e528b', input)
      .then(response => handleResponse((response.outputs[0].data.regions)))
      .catch(err => alert('Please insert a valid image URL - ' + err));
  }

  function handleResponse(resp) {
    const info = resp.map(e => e.region_info.bounding_box);
    const image = document.getElementById('img');
    const height = image.height;
    const width = image.width;

    return info.map(face => {
      return setBox(oldBox => [...oldBox, {top: parseInt(face.top_row * height),
                                          left: parseInt(face.left_col * width),
                                          bottom: height - (parseInt(face.bottom_row * height)),
                                          right: width - (parseInt(face.right_col * width))}]);
      });
  }

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