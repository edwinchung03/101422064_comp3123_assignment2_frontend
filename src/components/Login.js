import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../APIConfig';

const Login = ({updateStatus}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/user/login', {
        email,
        password,
      });

      console.log('Login successful', response.data);
      localStorage.setItem('authToken', response.data.token);
      updateStatus(true);
      navigate("/employees");

    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message || 'Login failed');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  return (
    <div>
        <h2>Welcome Back!</h2>
        <p>Please enter your details
        </p>
        {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
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
            <label>Password:</label>
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
            <button type="submit" disabled={loading} style={styles.loginButton}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p>
          Is it your first time? <Link to="/signup">Then register</Link>
        </p>
    </div>
  );
};

const styles = {
  loginButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100',
    transition: 'background-color 0.3s ease',
    marginBottom: '15px'
  }
}

export default Login;
