// src/pages/LogInPage.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ToggleSwitch from '../hooks/ToggleSwitch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const LogInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEmailValid(email)) {
      const deviceToken = "0";
      const userData = { email, password, deviceToken };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_LOGIN_API_URL}`,
          userData
        );
        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem('token', token);
          console.log(token)

          // Navigate to the next page
          navigate('/Home');
        } else {
          toast.error('Login failed. Please check your credentials and try again.');
        }
      } catch (err) {
        toast.error(err.response.data.message || 'An error occurred. Please try again.');
      }

      setIsFormSubmitted(true);
    } else {
      alert('Incorrect Credentials.');
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = isEmailValid(email) && password !== '';

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      
      <h2 className='createAccountText'>Log Into Account</h2>
      <h5 className='welcmBackCemperiumText'>Welcome Back to Cemperium Exchange!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder='Email'
          className='emailAndPassInput'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='emailAndPassInput'
          required
        />
        <button
          type="button"
          onClick={handlePasswordToggle}
          style={{
            position: 'absolute',
            top: '48%',
            transform: 'translateY(-50%)',
            right: '40px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
            style={{ fontSize: "20px", color: "#B0B1B2" }} />
        </button>

        <div className='forgotPasswordDiv'>
          <h5 className='forgotPasswordText'>Forgotten password?</h5>
        </div>
        <div className='toggleSwitchDiv'>
          <ToggleSwitch />
          <h4 className='toggleSwitchText'>Remember me</h4>
        </div>

        <br />

        <br />
        <button className='createAccountButton'
          type="submit"
          style={{
            backgroundColor: isFormValid ? 'rgb(81,154,206)' : 'gray',
            color: 'white',
            cursor: isFormValid ? 'pointer' : 'not-allowed'
          }}
          disabled={!isFormValid}
        >Log In

        </button>
      </form>

      {isFormSubmitted && (
        console.log("welcome home")
      )}
    </div>
  );
};

export default LogInForm;
