import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../components/Screenshot 2025-01-02 222219.png"; 
import img1 from "../components/Screenshot 2025-01-02 221216.png"; // Adjust the path based on your folder structure
import '../Styles/Login.css';
import { FaHome, FaUser, FaComment, FaBars } from 'react-icons/fa'; // Import the required icons

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', role: 'User',password: ''
  });
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 'Investor' : 'User') : value
    });
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/send-otp`, { email: formData.email });
      setGeneratedOtp(response.data.otp);
      setOtpSent(true);
      setMessage('OTP sent to your email.');
    } catch (error) {
      setError('Error sending OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (otp !== generatedOtp) {
      setError('Invalid OTP');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/register`, formData);
      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <button
            className="account-button"
            onClick={() => navigate("/account")}
        >
            Account
        </button>
      </nav>

      <div className="main">
        {/* Left Sidebar */}
        <div className="left">
          <ul>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/account')}>Account</li>
            <li>My Files</li>
            <hr />
            <li>CATEGORY</li>
            <li onClick={() => navigate('/uiux')}>UI/UX</li>
                            <li onClick={() => navigate('/ai-ml')}>AI/ML</li>
                            <li onClick={() => navigate('/web')}>Web Devlopment</li>
                            <li onClick={() => navigate('/app')}>App Devlopment</li>
          </ul>
        </div>

        {/* Mobile Hamburger Icon */}
        <button className="hamburger">
          ☰
        </button>

        {/* Footer Navigation for Mobile View */}
       
                       <div className="footer-nav">
                   <ul>
                       <li onClick={() => navigate('/')} className="footer-nav-item">
                           <FaHome className="footer-nav-icon" />
                       </li>
                       <li onClick={() => navigate('/account')} className="footer-nav-item">
                           <FaUser className="footer-nav-icon" />
                       </li>
                      
                       <li className="footer-nav-item">
                           <div className="dropdown">
                               <FaBars className="footer-nav-icon" />
                               <div className="dropdown-content">
                                   <ul>
                                   <li onClick={() => navigate('/uiux')}>UI/UX</li>
                            <li onClick={() => navigate('/ai-ml')}>AI/ML</li>
                            <li onClick={() => navigate('/web')}>Web Devlopment</li>
                            <li onClick={() => navigate('/app')}>App Devlopment</li>
                                   </ul>
                               </div>
                           </div>
                       </li>
                   </ul>
               </div>

               <div className="login-container">
        <div className="login-form">
          <h2>Register</h2>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required />
            <input type="text" name="password" placeholder="password" value={formData.password} onChange={handleChange} required />

            <div className="checkbox-container">
              <label>
                <input type="checkbox" name="role" checked={formData.role === 'Investor'} onChange={handleChange} />
                Register as Investor
              </label>
            </div>

            {!otpSent ? (
              <button type="button" onClick={sendOtp}>Send OTP</button>
            ) : (
              <>
                <input type="text" name="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                <button type="submit">Register</button>
              </>
            )}
          </form>

          <p className="signup-link">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
        <div className="login-image">
          <img src={img1} alt="Login" />
        </div>
      </div>
      </div>

    </>
  );
};

export default Register;
