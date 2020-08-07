import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

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
  const [route, setRoute] = useState('signup');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
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

  function loadGuest() {
    setIsGuest(true);
    setUser({
      id: '',
      name: 'Guest',
      email: '',
      entries: 0,
      joined: ''
    });
    handleRouteChange('home');
  }

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit() {
    setUrl(input);
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: input
        })
      })
      .then(response => response.json())
      .then(response => {
        handleResponse((response.outputs[0].data.regions));
        if(response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
          .then(response => response.json())
          .then(count => setUser(user => ({...user, entries: count})))
          .catch(err => console.log(err))
        }
      })
      .then(setBox([])) // Needed to empty the boxes infos from past pics
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
      setIsGuest(false);
      setUrl('');
      setInput('');
      setBox([]);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  return (
    <div className="App">
      {isSignedIn 
      ? <Navigation handleRouteChange={handleRouteChange} isSignedIn={isSignedIn} route={route} />
      : <div> 
          <h1 className='f1 tc purple'><Logo />Welcome to Face Recon!</h1>
          <h3 className='f4 tc purple'>The app that recognizes faces of an image URL.</h3>
        </div>
      }
      <Particles className='particles' params={particlesSettings} />
      {route === 'home' && !isGuest
      ? <div>
          <Logo />
          <Rank
            name={user.name}
            entries={user.entries}
          />
          <ImageLinkForm value={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
          <FaceRecognition url={url} box={box}/>
        </div>
      : route === 'home' && isGuest 
      ? <div>
          <h1 className='f1 tc purple'><Logo />Hi {user.name}!</h1>
          <h3 className='f4 tc purple'>Want to track your entries? Sign out and register!</h3>
          <ImageLinkForm value={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
          <FaceRecognition url={url} box={box}/>
        </div>
      : (
          route === 'signin'
          ? <SignIn handleRouteChange={handleRouteChange} loadUser={loadUser} /> 
          : <SignUp handleRouteChange={handleRouteChange} loadUser={loadUser} loadGuest={loadGuest} />
        )
      }
    </div>
  );
}

export default App;