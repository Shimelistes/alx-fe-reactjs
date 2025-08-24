import React, { useState } from 'react';
import './RegistrationForm.css'; // Optional: for styling

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // New state to manage specific errors for each field
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    
    // Create a temporary object to hold validation errors
    const newErrors = {};

    // Explicit validation logic for each field
    if (!username) {
      newErrors.username = 'Username is required.';
    }
    if (!email) {
      newErrors.email = 'Email is required.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }

    // Update the state with the new errors object
    setErrors(newErrors);

    // If there are no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully!', { username, email, password });
      
      // Optional: Reset form fields after submission
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="registration-form-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;