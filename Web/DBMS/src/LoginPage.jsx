import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Make sure useAuth is correctly imported
import './LoginPage.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth(); // Get login function from AuthContext

  // Form validation logic
  const validateForm = () => {
    if (!isLogin) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
    }
    return true;
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:8000/api/login/', { username, password });
        
        // Set user info in localStorage and context
        localStorage.setItem('username', response.data.username);
        login(response.data.username); // Update context state with the logged-in user
        
        // Redirect to SQL page
        navigate('/SQL');
      } else {
        await axios.post('http://localhost:8000/api/register/', { username, password });
        setIsLogin(true);
        setError('Registration successful! Please login.');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError(isLogin ? 'Invalid username or password' : 'Username already exists');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle between login and registration forms
  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <header className="login-header">
          <h1 className="login-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="login-subtitle">
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Fill in the information to create your account'}
          </p>
        </header>

        {error && (
          <div className={`message ${error.includes('successful') ? 'success-message' : 'error-message'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="input-label">Username</label>
            <div className="input-container">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
                required
                minLength={3}
              />
              <span className="input-icon">👤</span>
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Password</label>
            <div className="input-container">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
                minLength={6}
              />
              <span className="input-icon">🔒</span>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="input-label">Confirm Password</label>
              <div className="input-container">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`login-input ${
                    confirmPassword && password !== confirmPassword ? 'input-error' : ''
                  }`}
                  required
                />
                <span className="input-icon">🔒</span>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <span className="input-error-text">Passwords do not match</span>
              )}
            </div>
          )}

          <button
            type="submit"
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading || (!isLogin && password !== confirmPassword)}
          >
            {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="divider">
          <span className="divider-text">OR</span>
        </div>

        <button className="toggle-button" onClick={handleToggleForm}>
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
