import React, { useState } from 'react';

function SignIn({ handleRouteChange, loadUser }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  } 

  function handlePassChange(event) {
    setPass(event.target.value);
  }
  
  function handleSubmitSignIn(event) {
    event.preventDefault();
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
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
    .catch(err => console.log('no user id: ' + err))
  }

  return (
    <div className='mt5'>
      <article className="ba dark-gray b--black-10 w-100 w-50-m w-25-l pa4 mv4 shadow-5 center br3">
        <div className="">
          <form className="w-100" >
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 tc">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={handleEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100 br3" type="email" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={handlePassChange} className="b pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100 br3" type="password" />
              </div>
              <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
            </fieldset>
            <div className="">
              <input onClick={handleSubmitSignIn} className="b ph3 pv2 f6 input-reset grow pointer bg-purple hover-bg-white hover-purple link ba dib white" type="submit" value="Sign in" />
            </div>
            <div className="lh-copy mt3">
              <a onClick={() => handleRouteChange('signup')} href="#0" className="f6 link dim black db b hover-white">Not registered yet? Sign up here!</a>
            </div>
          </form>
        </div>
      </article>
    </div>
  );
}

export default SignIn;