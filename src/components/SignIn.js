import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import "./Forms.css";


function SignIn({ handleRouteChange, loadUser }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { register, handleSubmit, errors } = useForm();


  function handleEmailChange(event) {
    setEmail(event.target.value);
  } 

  function handlePassChange(event) {
    setPass(event.target.value);
  }
  
  function handleSubmitSignIn() {
    fetch('https://thawing-caverns-91691.herokuapp.com/signin', {
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
        <form className="App w-100" onSubmit={handleSubmit(handleSubmitSignIn)}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 tc">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                onChange={handleEmailChange} 
                className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100 br3" 
                type="email" 
                name="email" 
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              />
              <ErrorMessage error={errors.email} />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
                onChange={handlePassChange} 
                className="b pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100 br3" 
                type="password" 
                name="password" 
                ref={register({ required: true })}
              />
              <ErrorMessage error={errors.password} />
            </div>
          </fieldset>
          <div className="">
            <input 
              className="b ph3 pv2 f6 input-reset grow pointer bg-purple hover-bg-white hover-purple link ba dib white" 
              type="submit" 
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <a 
              onClick={() => handleRouteChange('signup')} 
              href="#0" 
              className="f6 link dim black db b hover-white"
            >
              Not registered yet? Sign up here!
            </a>
          </div>
        </form>
      </article>
    </div>
  );
}

export default SignIn;