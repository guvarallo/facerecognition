import React, { useState } from 'react';

function SignUp({ handleRouteChange, loadUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  } 

  function handlePassChange(event) {
    setPass(event.target.value);
  }

  function handleSubmitSignUp(event) {
    event.preventDefault();
    fetch('http://localhost:3000/signup', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        email: email,
        password: pass
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id) {
        loadUser(user);
        handleRouteChange('home');
      }
    })
  }

  return (
    <div className='mt5'>
      <article className="ba dark-gray b--black-10 w-100 w-50-m w-25-l pa4 mv4 shadow-5 center">
        <div className="">
          <form className="w-100" >
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 tc">Sign Up</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" type="text" onChange={handleNameChange} />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" type="email" onChange={handleEmailChange} />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" type="password" onChange={handlePassChange} />
              </div>
            </fieldset>
            <div className="">
              <input onClick={handleSubmitSignUp} className="b ph3 pv2 f6 input-reset grow pointer bg-purple hover-bg-white hover-purple link ba dib white" type="submit" value="Sign up" />
            </div>
            <div className="lh-copy mt3">
              <a onClick={() => handleRouteChange('signin')} href="#0" className="f6 link dim black db b hover-white">Already registered? Sign in here!</a>
            </div>
          </form>
        </div>
      </article>
    </div>

  );
}

export default SignUp;