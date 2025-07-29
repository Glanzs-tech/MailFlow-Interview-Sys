import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    // After successful registration
    navigate('/dashboard');
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form-group">
        <label htmlFor="name" className="register-label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          required
          className="register-input"
        />

        <label htmlFor="email" className="register-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          className="register-input"
        />

        <label htmlFor="password" className="register-label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          className="register-input"
        />

        <button type="submit" className="register-button">Register</button>
      </form>

      <p className="register-text">
        Already have an account? <Link to="/" className="register-link">Login</Link>
      </p>
    </div>
  );
};

export default Register;
