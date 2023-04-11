import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './loginform.css'

const LoginForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError ] = useState('')
  const [passwordError, setPassWordError] = useState('')
  const [showError, setShowError] = useState('')


  useEffect(() => {
    if (email.length <= 0 || !email.trim()) setEmailError("Email is required")
    if (!email.includes('@') || !email.includes(".")) setEmailError("Invalid email.")
    else setEmailError("")
  }, [email])

  useEffect(() => {
    if (password.length <= 0 || !password.trim()) setPassWordError("password is required")
    else setPassWordError("")

  }, [password])


  const onLogin = async (e) => {
    e.preventDefault();
    setShowError(true)
    if (!emailError && !passwordError) {
      setShowError(false)
      const data = await dispatch(login(email, password));
      if (data) {
        if (data.email) {
          setEmailError(data.email)
          setShowError(true)
        }
        if (data.password) {
          setPassWordError(data.password)
          setShowError(true)
        }
      }
    }
  };

  const signUp = () => {(
    history.push('/signup')
  )}

  const demoSignIn = async (e) => {
    e.preventDefault();
    dispatch(login("user1@aa.io", "password"))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-form-background">
      <form className="login-form" onSubmit={onLogin}>
        <div>

        </div>
        <div className="login-form-top">
          <div>
            <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
          </div>
          <div>Sign in</div>
          <div>to continue to uTube</div>
        </div>
        <div className="email-field-login">
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            value={email}
            onChange={updateEmail}
          />
            {
              showError ?
                <div>{emailError}</div>
                :
                null
            }
        </div>
        <div className="password-field-login">
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
            />
            {
              showError ?
                <div>{passwordError}</div>
                :
                null
            }
        </div>
        <div className="demo-user-login-text">
          Don't have an account? Log in as a
          <div className="login-demo" onClick={demoSignIn}>Demo User</div>
        </div>
        <div className="login-links-container">
          <span className="login-links" onClick={signUp}>Create Account</span>
          <button className="login-links" type='submit'>Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
