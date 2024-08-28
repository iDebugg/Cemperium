import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const resetForm = () => {
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setIsChecked(false);
    setIsFormSubmitted(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isChecked) {
      const deviceToken = "0";
      const username = `${firstname}${lastname}`;
      const userData = { email, username, password, deviceToken };
      console.log(`======= user data ========`);
      console.log(userData);
      try {
        const res = await axios.post(`${process.env.REACT_APP_SIGNUP_API_URL}`,
          userData);
        console.log('====== response ======');
        console.log(res.data);
        if (res.data.status === 200) {
          toast.success(res.data.message, {
            onClose: () => navigate('/LogIn')
          });
        } else {
          toast.error(res.data.message, {
            autoClose: 5000,  // Toast displays for 5 seconds
            onClose: () => {
              resetForm();
              refreshPage();
            }
          });
        }
      } catch (err) {
        console.log('======== error here ========');
        if (err.response && err.response.data && err.response.data.message) {
          console.log(err.response.data);
          toast.error(err.response.data.message, {
            autoClose: 5000,  // Toast displays for 5 seconds
            onClose: () => {
              resetForm();
              refreshPage();
            }
          });
        } else {
          toast.error('An error occurred. Please try again later.', {
            autoClose: 5000,  // Toast displays for 5 seconds
            onClose: () => {
              resetForm();
              refreshPage();
            }
          });
        }
      }

      console.log(userData);
      setIsFormSubmitted(true);
    } else {
      alert('Please agree to the terms to create an account.');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2 className='createAccountText'>Create an Account</h2>
      <h5 className='joinCemperiumText'>Join Cemperium Exchange!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text" placeholder='First name' className='firstNameInput'
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <input
          type="text" placeholder='Last name' className='lastNameInput'
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <input
          type="email" placeholder='Email' className='emailAndPassInput'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password' className='emailAndPassInput' required
        />
        <button
          type="button"
          onClick={handlePasswordToggle}
          style={{
            position: 'absolute',
            top: '58%',
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
        <br />
        <label className='agreenmentText'>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span> I agree with Cemperium's Terms of services, Privacy policy and default notification settings.</span>
        </label>
        <br />
        <button className='createAccountButton'
          type="submit"
          style={{
            backgroundColor: isChecked ? 'rgb(81,154,206)' : 'gray',
            color: 'white',
            cursor: isChecked ? 'pointer' : 'not-allowed'
          }}
          disabled={!isChecked || isFormSubmitted}
        >
          Create Account
        </button>
      </form>
      {isFormSubmitted && (
        console.log("Form submitted successfully")
      )}
    </div>
  );
};

export default SignupForm;
