import { useState } from 'react';
import './GetStarted.css';

const GetStarted = ({ onAuthenticate }) => {
  const [showLanding, setShowLanding] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find(user => user.email === formData.email)) {
      setError('User with this email already exists');
      return;
    }

    // Create new user
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password // In a real app, this should be hashed
    };

    // Save user to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // After signup, go to Login tab instead of auto-login
    setIsLogin(true);
    setShowLanding(false);
    setIsOtpStep(false);
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user
    const user = users.find(
      user => user.email === formData.email && user.password === formData.password
    );

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    // 2FA: generate 6-digit OTP and move to OTP step
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setIsOtpStep(true);
    // For demo purposes, show OTP in alert. In real apps, send via email/SMS.
    alert(`Your OTP code is: ${otp}`);
  };

  const handleSubmit = (e) => {
    if (isOtpStep) {
      e.preventDefault();
      if (enteredOtp.trim() === generatedOtp) {
        // Complete login
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === formData.email);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          onAuthenticate();
        } else {
          setError('User not found during OTP verification');
        }
      } else {
        setError('Invalid OTP');
      }
      return;
    }

    if (isLogin) {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  if (showLanding) {
    return (
      <div className="get-started-container">
        <div className="landing-canvas">
          <div className="landing-box">
            <img src="/logo.jpg" alt="Sports League Logo" className="landing-logo" />
            <h1 className="landing-title">Sports League</h1>
            <p className="landing-subtitle">Manage leagues, teams, matches, and players</p>

            <div className="landing-info">
              <p>
                Organize your competitions with ease. Create leagues, register teams, schedule
                matches, and track player statistics in one place.
              </p>
              <ul>
                <li>Create and manage leagues and divisions</li>
                <li>Build team rosters and player profiles</li>
                <li>Schedule fixtures and record match results</li>
                <li>View dashboards with key insights</li>
              </ul>
            </div>

            <button className="get-started-button" onClick={() => setShowLanding(false)}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="get-started-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>Welcome to Sports League</h1>
          <button
            type="button"
            className="back-to-landing"
            onClick={() => setShowLanding(true)}
            aria-label="Back to Get Started"
          >
            ← Back to Get Started
          </button>
          <div className="auth-tabs">
            {!isOtpStep && (
              <>
                <button 
                  className={`tab ${isLogin ? 'active' : ''}`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button 
                  className={`tab ${!isLogin ? 'active' : ''}`}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {isOtpStep ? (
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="6-digit code"
                required
                maxLength={6}
              />
            </div>
          ) : (
          !isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          ))}
          <div className="form-group">
            {!isOtpStep && (
              <>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </>
            )}
          </div>
          <div className="form-group">
            {!isOtpStep && (
              <>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                  required
                />
              </>
            )}
          </div>
          {!isOtpStep && !isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          <button type="submit" className="auth-button">
            {isOtpStep ? 'Verify OTP' : isLogin ? 'Login' : 'Sign Up'}
          </button>
          {isOtpStep && (
            <button
              type="button"
              className="auth-button"
              style={{ marginTop: '0.5rem', background: '#6b7280' }}
              onClick={() => {
                // resend OTP
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                setGeneratedOtp(otp);
                alert(`Your new OTP code is: ${otp}`);
              }}
            >
              Resend OTP
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default GetStarted; 