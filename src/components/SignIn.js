import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../firebase';
import { AuthContext } from '../auth/useAuth';

const SignIn = ({ history }) => {
  const handleSignIn = useCallback(
    async e => {
      e.preventDefault();
      const { email, password } = e.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history],
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div>
          <label>Email</label>
          <input type='email' placeholder='email' name='email' />
        </div>
        <div>
          <label>Password</label>
          <input type='password' placeholder='password' name='password' />
        </div>
        <button type='submit'>Sign in with Email</button>
      </form>
    </div>
  );
};

export default withRouter(SignIn);
