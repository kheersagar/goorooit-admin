import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import demoLogo from '../images/demo-logo.png';
import { login } from '../redux/api';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/LoginPage.css';

const initialData = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const history = useHistory();
  const [formData, setFormData] = useState(initialData);
  const [isloading,setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleLogin = async () => {
    if (formData.email && formData.password) {
      setIsLoading(true);
      try {
        const { data } = await login(formData);
        // console.log(data);
        Cookies.set('goorooitAdmin', data.token);
        setIsLoading(false);
        history.push('/home');
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      alert('Both fields required');
    }
  };

  return (
    <div className='loginPage-container'>
      <div className='loginPage-formDiv'>
        <div className='loginPage-formHeaderDiv'>
          <div className='logoContainer'>
            <img src={demoLogo} alt='logo' className='logoImage' />
            <span className='brandName'>Goorooit</span>
          </div>
          <div className='loginPage-headerContent'>
            <h3 className='loginPage-headerTitle'>Log In to Dashboard </h3>
            <p className='loginPage-headerSub'>
              Enter your email and password below
            </p>
          </div>
        </div>
        <div className='loginPage-formContent'>
          <div className='loginPage-formFieldDiv'>
            <label className='loginPage-inputLabel'>Email</label>
            <input
              type='email'
              name='email'
              className='loginPage-inputField'
              placeholder='Email address'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='loginPage-formFieldDiv'>
            <div className='loginPage-passDiv'>
              <label className='loginPage-inputLabel'>Password</label>
              {/**<label className='loginPage-inputLabel forgotPass'>
                Forgot password?
              </label> */}
            </div>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
              value={formData.password}
              className='loginPage-inputField'
            />
          </div>
          <div className='loginPage-submitBtnDiv'>
            <button className='loginPage-submitBtn' onClick={handleLogin}>
              {isloading ?<CircularProgress size={15} color="inherit"/> : 'Log In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
