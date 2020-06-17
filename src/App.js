import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Particles from 'react-particles-js';
import Logo from './components/logo/Logo';
import Rank from './components/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';

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
  return (
    <div className="App">
      <Navigation />
      <Particles className='particles' params={particlesSettings} />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
