import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import app from '../firebase';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async e => {
      e.preventDefault();
      const { email, password } = e.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history],
  );

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email</label>
          <input type='email' name='email' placeholder='Email' />
        </div>
        <div>
          <label>Password</label>
          <input type='password' name='password' placeholder='Password' />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
