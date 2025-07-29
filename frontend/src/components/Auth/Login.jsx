import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: Add real authentication here later

    // Redirect to dashboard after login
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email" className="login-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter registered Email"
          required
          autoComplete="email"
          className="login-input"
        />

        <label htmlFor="password" className="login-label">Enter Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter Password"
          required
          autoComplete="current-password"
          className="login-input"
        />

        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="login-register-text">
        Don't have an account?{' '}
        <Link to="/register" className="login-register-link">Register</Link>
      </p>
    </div>
  );
};

export default Login;
