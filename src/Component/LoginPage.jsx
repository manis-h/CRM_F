import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPageCss.css';
import useStore from '../Store';
import Cookies from 'universal-cookie';
import { useLoginUserMutation } from '../Service/Query';

const LoginPage = () => {
  // const setLogin = useStore((state) => state.setLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const [loginUser,{data,isSuccess,isLoading,isError,error}] = useLoginUserMutation()
  const navigate = useNavigate();
  const cookies = new Cookies();
  const {setLogin,setEmployee} = useStore()

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
  
    try {
      // const response = await axios.post('http://localhost:3000/api/employees/login', { email, password });
       loginUser({email,password})
      // console.log('res',res.isLoading)
      // Check if the response message indicates success
      // if (response.status === 'Login successful') {
      //   // Optionally set a cookie if the token is included in the response
      //   // if (response.data.token) {
      //   //   cookies.set('authToken', response.data.token, { path: '/' });
      //   // }
        
      //   // setLogin(true);
      //   // navigate('/')
      //   window.location.assign('/');
      // } else {
      //   setError('Invalid email or password');
      // }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    if(isSuccess ) {
      console.log('token',data)
      if (data.token) {
          cookies.set('authToken', data.token, { path: '/' });
        }
        
        setLogin(true);
        setEmployee(data.data)
        
        navigate('/')

    } 
      

  },[isSuccess])
  

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className='loginH2'>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder='Email'
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder='Password'
            />
          </div>
          <button type="submit" className="btn" >Login</button>
        </form>
        <p className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</p>
      </div>
    </div>
  );
};

export default LoginPage;
