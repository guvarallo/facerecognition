import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import "./Forms.css";


function SignUp({ handleRouteChange, loadUser, loadGuest }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { register, handleSubmit, errors } = useForm();

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  } 

  function handlePassChange(event) {
    setPass(event.target.value);
  }

  function handleSubmitSignUp() {
    fetch('https://thawing-caverns-91691.herokuapp.com/signup', {
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
    .catch(err => console.log(err))
  }

  return (
    <div className='mt5'>
      <article className="ba dark-gray b--black-10 w-100 w-50-m w-25-l pa4 mv4 shadow-5 center">
        <div className="">
          <form className="App w-100" onSubmit={handleSubmit(handleSubmitSignUp)}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 tc">Sign Up</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" 
                  name="name" type="text" 
                  onChange={handleNameChange} 
                  ref={register({ required: true })}
                />
                <ErrorMessage error={errors.name} />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" 
                  name="email" type="email" 
                  onChange={handleEmailChange} 
                  ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
                <ErrorMessage error={errors.email} />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" 
                  name="password" 
                  type="password" 
                  onChange={handlePassChange} 
                  ref={register({ required: true })}
                />
                <ErrorMessage error={errors.password} />
              </div>
            </fieldset>
            <div className="">
              <input 
                className="b ph3 pv2 f6 input-reset grow pointer bg-purple hover-bg-white hover-purple link ba dib white" 
                type="submit" 
                value="Sign up" 
              />
            </div>
            <div className="lh-copy mt3">
              <a 
                onClick={() => handleRouteChange('signin')} 
                href="#0" 
                className="f6 link dim black db b hover-white"
              >
                Already registered? Sign in here!
              </a>
              <a 
                onClick={() => loadGuest()} 
                href="#0" 
                className="f6 link dim black db b hover-white"
              >
                Or just enter as a guest over here!
              </a>
            </div>
          </form>
        </div>
      </article>
    </div>

  );
}

export default SignUp;