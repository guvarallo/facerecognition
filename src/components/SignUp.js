import React from 'react';

function SignUp({ handleRouteChange }) {
  return (
    <article className="ba dark-gray b--black-10 w-100 w-50-m w-25-l pa4 mv4 shadow-5 center">
      <div className="">
        <form className="w-100" >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 tc">Sign Up</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" type="text" name="name"  id="name" />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" type="password" name="password"  id="password" />
            </div>
          </fieldset>
          <div className="">
            <input onClick={() => handleRouteChange('home')} className="b ph3 pv2 f6 input-reset grow pointer bg-purple hover-bg-white hover-purple link ba dib white" type="submit" value="Sign up" />
          </div>
          <div className="lh-copy mt3">
            <a onClick={() => handleRouteChange('signin')} href="#0" className="f6 link dim black db b hover-white">Already registered? Sign in here!</a>
          </div>
        </form>
      </div>
    </article>
  );
}

export default SignUp;