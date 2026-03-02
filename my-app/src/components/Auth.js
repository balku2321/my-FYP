import React, { useState, useEffect } from 'react';
import './Auth.css';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [step, setStep] = useState(1); // Step for registration (1 = role selection, 2 = user/farmer details)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState(''); // To store selected role
  const [farmName, setFarmName] = useState('');
  const [farmAddress, setFarmAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null); // To handle profile image

  useEffect(() => {
    setTimeout(() => {
      setIsSignIn(true);
    }, 200);
  }, []);

  const toggleMode = () => {
    setIsSignIn((prevState) => !prevState);
    setStep(1); // Reset step when toggling
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setStep(2); // Proceed to user/farmer details after role selection
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    if (role === 'farmer' && (!farmName || !farmAddress || !phone || !city)) {
      alert('Please fill in all farmer details.');
      return;
    }
  
    try {
      const requestData = {
        fullName,
        email,
        password,
        role,
        farmName: role === 'farmer' ? farmName : null,
        farmAddress: role === 'farmer' ? farmAddress : null,
        city: role === 'farmer' ? city : null,
        phone: role === 'farmer' ? phone : null,
      };
  
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Send data as JSON
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Sign-up successful!');
        setIsSignIn(true); // Switch to sign-in mode after successful registration
      } else {
        alert(data.error || 'Error occurred during registration.');
      }
    } catch (error) {
      alert('Server error during registration.');
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log('Login response:', data);  // Debugging log to inspect the response data
  
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token
        alert('Sign-in successful!');
        // Decode token to get role and redirect accordingly
        const decodedToken = JSON.parse(atob(data.token.split('.')[1])); // Decode JWT
        console.log('Decoded Token:', decodedToken);  // Debugging log to inspect the decoded token
  
        if (decodedToken.role === 'farmer') {
          window.location.href = '/FarmerDashboard';
        } else if (decodedToken.role === 'user') {
          window.location.href = '/UserDashboard';
        } else {
          window.location.href = '/ExchangePanel'; // Default fallback
        }
      } else {
        alert(data.error || 'Invalid credentials.');
      }
    } catch (error) {
      alert('Server error during sign-in.');
      console.error('Error during sign-in:', error);  // Debugging log for unexpected errors
    }
  };

  // Logout function
  
  return (
    <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
      <div className="row">
        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="col align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <div className="form sign-up">
                <form>
                  <div className="input-group">
                    <label>Are you a:</label>
                    <select value={role} onChange={(e) => handleRoleSelection(e.target.value)} required>
                      <option value="">Select Role</option>
                      <option value="user">User</option>
                      <option value="farmer">Farmer</option>
                    </select>
                  </div>

                  <button type="button" onClick={() => setStep(2)}>Next</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: User or Farmer Details Form */}
        {step === 2 && (
          <div className="col align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <div className="form sign-up">
                <form onSubmit={handleSignUpSubmit}>
                  {/* User details */}
                  {role === 'user' && (
                    <>
                      <div className="input-group">
                        <i className="bx bxs-user"></i>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* Farmer details */}
                  {role === 'farmer' && (
                    <>
                      <div className="input-group">
                        <i className="bx bxs-user"></i>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group">
                        <i className="bx bxs-home"></i>
                        <input
                          type="text"
                          placeholder="Farm Name"
                          value={farmName}
                          onChange={(e) => setFarmName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group">
                        <i className="bx bx-home-alt"></i>
                        <input
                          type="text"
                          placeholder="Farm Address"
                          value={farmAddress}
                          onChange={(e) => setFarmAddress(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group">
                        <i className="bx bx-city"></i>
                        <input
                          type="text"
                          placeholder="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group">
                        <i className="bx bx-phone"></i>
                        <input
                          type="text"
                          placeholder="Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="input-group">
                    <i className="bx bx-mail-send"></i>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit">Sign Up</button>
                  <p>
                    <span>Already have an account?</span>
                    <b onClick={toggleMode} className="pointer">Sign in here</b>
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* SIGN IN */}
        {isSignIn && (
          <div className="col align-items-center flex-col sign-in">
            <div className="form-wrapper align-items-center">
              <div className="form sign-in">
                <form onSubmit={handleSignInSubmit}>
                  <div className="input-group">
                    <i className="bx bx-mail-send"></i>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit">Sign In</button>
                  <p>
                    <span>Don't have an account?</span>
                    <b onClick={toggleMode} className="pointer">Sign up here</b>
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};


export default Auth;
