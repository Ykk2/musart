
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signupform.css'

const SignUpForm = () => {

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [showError, setShowError] = useState('')

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [usernameError, setUserNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPassWordError] = useState('')
  const [repeatPasswordError, setRepeatPasswordError] = useState('')



  useEffect(() => {
    if (firstName.length <= 0 || !firstName.trim()) setFirstNameError("First Name is required")
    else setFirstNameError("")
  }, [firstName])

  useEffect(() => {
    if (lastName.length <= 0 || !lastName.trim()) setLastNameError("Last Name is required")
    else setLastNameError("")
  }, [lastName])

  useEffect(() => {
    if (username.length <= 0 || !username.trim()) setUserNameError("Username is required")
    else setUserNameError("")
  }, [username])

  useEffect(() => {
    if (email.length <= 0 || !email.trim()) setEmailError("Email is required")
    if (!email.includes('@') || !email.includes(".")) setEmailError("Invalid email.")
    else setEmailError("")
  }, [email])

  useEffect(() => {
    if (password.length <= 0 || !password.trim()) setPassWordError("Password is required")
    if (password.length < 8) setPassWordError("Need minimum 8 characters")

    else setPassWordError("")

  }, [password])

  useEffect(() => {
    if (repeatPassword.length <= 0 || !repeatPassword.trim()) setRepeatPasswordError("please confirm password")
    if (password !== repeatPassword) setRepeatPasswordError("Passwords must match")
    else setRepeatPasswordError("")

  }, [repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    setShowError(true)
    if (!firstNameError && !lastNameError && !usernameError && !emailError && !passwordError && !repeatPasswordError) {
      setShowError(false)
      const data = await dispatch(signUp(username, email, password, firstName, lastName));
      if (data) {
        if (data.email) {
          setEmailError(data.email)
          setShowError(true)
        }
        if (data.username) {
          setUserNameError(data.username)
          setShowError(true)
        }
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="sign-up-form-background">
      <form className="signup-form" onSubmit={onSignUp}>
        <div>

        </div>
        <div className="signup-form-left">
          <div>

          </div>
          <div className="signup-form-left-top">
            <div><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></div>
            <div>Create your account</div>
            <div>to continue to uTube</div>
          </div>
          <div className='signup-first-last'>
            <div>
              <label>First Name</label>
              <input
                className="firstName"
                type='text'
                name='firstName'
                onChange={updateFirstName}
                value={firstName}
              ></input>
              {
                showError ?
                  <div className="signup-errors">{firstNameError}</div>
                  :
                  null
              }
            </div>
            <div>
              <label>Last Name</label>
              <input
                className="lastName"
                type='text'
                name='lastName'
                onChange={updateLastName}
                value={lastName}
              ></input>
              {
                showError ?
                  <div className="signup-errors">{lastNameError}</div>
                  :
                  null
              }
            </div>
          </div>
          <div className="signup-username">
            <label>Username</label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
            {
              showError ?
                <div className="signup-errors">{usernameError}</div>
                :
                null
            }
          </div>
          <div className="signup-email">
            <label>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
            {
              showError ?
                <div className="signup-errors">{emailError}</div>
                :
                null
            }
          </div>
          <div className="signup-form-password-confirm">
            <div>
              <label>Password</label>
              <input
                className="password"
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
              ></input>
              {
                showError ?
                  <div className="signup-errors">{passwordError}</div>
                  :
                  null
              }
            </div>
            <div>
              <label>Repeat Password</label>
              <input
                className="repeat-password"
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
              {
                showError ?
                  <div className="signup-errors">{repeatPasswordError}</div>
                  :
                  null
              }
            </div>
          </div>
          <button type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
