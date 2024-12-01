import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../APIConfig';

const Signup = ({updateStatus}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/user/signup', {
        username,
        email,
        password,
      });

      console.log(response.data.message);
      localStorage.setItem('authToken', response.data.token);
      updateStatus(true);
      navigate("/employees");

    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message || 'Signup failed');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Welcome to my website!</h2>
      <p>Please enter your details
      </p>
      {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}

      <form onSubmit={handleSignup}>
      <div>
        <label>Username:</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            style={{marginBottom: 15, marginLeft: 5, width: 250}}
            required
          />
      </div>
          
      <div>
       <label>Email: </label>
       <input
         type="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder="Enter your email"
         style={{marginBottom: 15, marginLeft: 5, width: 250}}
         required
       />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={{marginBottom: 15, marginLeft: 5, width: 250}}
          required
        />
      </div>
      <div>
        <button type="submit" disabled={loading} style={styles.signUpButton}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </div>
   </form>
   <p>
    Do you already have an account? <Link to="/">Then Login</Link>
   </p>
</div>
  );
};

const styles = {
  signUpButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100',
    transition: 'background-color 0.3s ease'
  }
}

export default Signup;
