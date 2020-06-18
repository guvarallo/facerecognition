import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Particles from 'react-particles-js';
import Logo from './components/logo/Logo';
import Rank from './components/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition';
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
      value: 70,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
    }
  }
}

function App() {
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');

  function handleInputChange(event) {
    setInput(event.target.value);
    console.log(event.target.value);
  }

  function handleSubmit() {
    app.models.predict('a403429f2ddf4b49b307e318f00e528b', input).then(
    function(response) {
      setUrl(response.outputs[0].input.data.image.url);
    },
    function(err) {
      console.log('Ooops, something went wrong');
    }
  );
  }

  return (
    <div className="App">
      <Navigation />
      <Particles className='particles' params={particlesSettings} />
      <Logo />
      <Rank />
      <ImageLinkForm value={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
      <FaceRecognition url={url}/>
    </div>
  );
}

export default App;
