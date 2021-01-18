import React, { useState } from 'react';
//import Navbar from '../layouts/Navbar';

const LoginForm = () => {
  const [login, setLogin] = useState({ email: '', password: '' });

  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
    other: '',
  });

  const { email, password } = login;
  const { emailError, passwordError, other } = errors;

  const getUser = async () => {
    let url = 'http://localhost/Interviews/bizlogic/Index.php';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data === null || response.status !== 200) {
        setErrors((errors) => ({
          ...errors,
          other: 'Invalid Credentials!',
        }));
      } else {
        localStorage.setItem('username', data.username);
        localStorage.setItem('auth', data.auth_key);
        localStorage.getItem('auth')
          ? (window.location.pathname = '/users')
          : (window.location.pathname = '/');
      }
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const onChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setErrors({ emailError: '', passwordError: '', other: '' });

    if (email === '') {
      setErrors((errors) => ({
        ...errors,
        emailError: 'Email cannot be empty!',
      }));
    }
    if (password === '') {
      setErrors((errors) => ({
        ...errors,
        passwordError: 'Password cannot be empty!',
      }));
    }

    if (errors.emailError === '' && errors.passwordError === '') {
      getUser();
    }
  };

  return (
    <div>
      {other && (
        <div className='alert alert-danger' role='alert'>
          {other}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Email address</label>
          <input
            type='email'
            className='form-control'
            placeholder='Enter email'
            name='email'
            value={email}
            onChange={onChange}
            pattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
          />
          <small className='text-danger form-text'>{emailError}</small>
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Password'
            name='password'
            value={password}
            minLength='5'
            onChange={onChange}
          />
          <small className='text-danger form-text'>{passwordError}</small>
        </div>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
