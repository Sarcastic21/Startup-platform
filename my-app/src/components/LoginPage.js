import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../components/Screenshot 2025-01-02 222219.png";
import '../Styles/Login.css';
import img1 from "../components/Screenshot 2025-01-02 221216.png"; // Adjust the path based on your folder structure
import { FaHome, FaUser, FaComment, FaBars } from 'react-icons/fa'; // Import the required icons

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sidebarRef = useRef(null); // Reference to the sidebar

  const toggleSidebar = () => {
    setIsSidebarActive((prevState) => !prevState); // Toggle the sidebar state
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarActive(false); // Close the sidebar if clicked outside
    }
  };

  useEffect(() => {
    if (isSidebarActive) {
      document.addEventListener('mousedown', handleClickOutside); // Use 'mousedown' for better responsiveness
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup
    };
  }, [isSidebarActive]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, formData);
      
      console.log("Full API Response:", response.data); // Debug API response
  
      if (response.data.success) {
        setMessage('Login successful!');
        sessionStorage.setItem('email', formData.email);
        sessionStorage.setItem('role', response.data.role);
  
        const storedRole = sessionStorage.getItem('role');
        console.log("Stored Role in Session:", storedRole); // Debug stored role before navigation
  
        // ✅ Force React to re-render before navigating
        setTimeout(() => {
          if (storedRole === 'Investor') {
            console.log("Navigating to /investor-profile");  // Debug navigation
            navigate('/investor-profile');
          } else {
            console.log("Navigating to /account");  // Debug navigation
            navigate('/account');
          }
        }, 100); // Small delay to ensure sessionStorage is fully updated
      } else {
        setMessage(response.data?.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data); // Debug API error
      setMessage(error.response?.data?.message || 'An error occurred');
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
                    <div
                        ref={sidebarRef}
                        className={`left ${isSidebarActive ? 'active' : ''}`}
                    >
                        
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
                    <button className="hamburger" onClick={toggleSidebar}>
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
        <h2>Log In</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p className="forgot-password">Forgot password?</p>
          <button type="submit">Log In</button>
        </form>
        
        <p className="signup-link">
          Don’t have an account? <a href="/register">Sign up</a>
        </p>
      </div>
      <div className="login-image">
                       <img src={img1} alt="Logo"  />
       
      </div>
    </div>
    </div>

    </>
  );
};

export default Login;
