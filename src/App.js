import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Particles from 'react-particles-js';
import Logo from './components/logo/Logo';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Rank from './components/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import apiConfig from './apiKeys';

const app = new Clarifai.App({ 
  apiKey: `${apiConfig.apiKey}`
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
  const [route, setRoute] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });

  function loadUser(data) {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    });
  }

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit() {
    setUrl(input);
    app.models
      .predict('a403429f2ddf4b49b307e318f00e528b', input)
      .then(response => {
        handleResponse((response.outputs[0].data.regions));
        if(response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
        }
      })
      .then(setBox([])) // Needed to empty the box infos from past pics
      .catch(err => alert('Please insert a valid image URL - ' + err));
  }

  function handleResponse(resp) {
    const info = resp.map(e => e.region_info.bounding_box);
    const image = document.getElementById('img');
    const height = image.height;
    const width = image.width;
    info.map(face => {
      return setBox(oldBox => [...oldBox, {top: parseInt(face.top_row * height),
                                          left: parseInt(face.left_col * width),
                                          bottom: height - (parseInt(face.bottom_row * height)),
                                          right: width - (parseInt(face.right_col * width))}]);
      });
  }

  function handleRouteChange(route) {
    if (route === 'signin') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  return (
    <div className="App">
      {isSignedIn 
      ? <Navigation handleRouteChange={handleRouteChange} isSignedIn={isSignedIn} route={route} />
      : ''
      }
      <Particles className='particles' params={particlesSettings} />
      <Logo />
      {route === 'home'
      ? <div>
          <Rank
            name={user.name}
            entries={user.entries}
          />
          <ImageLinkForm value={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
          <FaceRecognition url={url} box={box}/>
        </div>
      : (
          route === 'signin'
          ? <SignIn handleRouteChange={handleRouteChange} loadUser={loadUser} /> 
          : <SignUp handleRouteChange={handleRouteChange} loadUser={loadUser} />
        )
      }
    </div>
  );
}

export default App;