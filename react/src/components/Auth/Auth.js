// src/components/Auth.js
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import "./auth.css"
const Auth = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate()
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        await axios.post('http://localhost:3001/api/users/register', { username, password })

        setIsRegistering(false);
        console.log("registered Successful")
      }

      const response = await axios.post('http://localhost:3001/api/users/login', { username, password });
      setToken(response.data.token);
      console.log("login Successful")
      navigate('./tasks')
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <div className="container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <p>
        {isRegistering
          ? 'Already have an account?'
          : "Don't have an account yet? Register now!"}
        <button className="toggleButton" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default Auth;
