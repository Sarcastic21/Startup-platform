import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../components/Screenshot 2025-01-02 222219.png"; 
import '../Styles/Account.css';
import { FaHome, FaUser, FaBars } from 'react-icons/fa';

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (!email) {
      navigate('/login');

    } 
    else if (role === 'User') {
        navigate('/account'); // Redirect if user is an investor
      }
    else {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/account?email=${email}`);
          setUser(response.data);
        } catch (err) {
          setError('Error fetching user data');
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <button className="account-button" onClick={() => navigate("/account")}>Account</button>
      </nav>

      <div className="main">
        <div className={`left ${isSidebarActive ? 'active' : ''}`}>
          <div className="detail">
            <div className="logo2">{user ? user.name.charAt(0).toUpperCase() : "N"}</div>
            <p className="Name">{user ? user.name : "Name"}</p>
          </div>
          <ul>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/account')}>Account</li>
            <li>My Files</li>
            <hr />
            <li>CATEGORY</li>
            <li onClick={() => navigate('/uiux')}>UI/UX</li>
            <li onClick={() => navigate('/ai-ml')}>AI/ML</li>
            <li onClick={() => navigate('/web')}>Web Development</li>
            <li onClick={() => navigate('/app')}>App Development</li>
          </ul>
          <button 
            onClick={handleLogout} 
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              color: '#fff',
              backgroundColor: '#f44336',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            Logout
          </button>
        </div>

        <button className="hamburger" onClick={toggleSidebar}>☰</button>

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
                    <li onClick={() => navigate('/web')}>Web Development</li>
                    <li onClick={() => navigate('/app')}>App Development</li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className='right'>
          <div className="account-container">
            <h1 className="account-title">My Account</h1>
            {user && (
              <div className="user-details">
                <div className="detail-item">
                  <span className="label">Name:</span>
                  <span className="value">{user.name}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{user.email}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Mobile:</span>
                  <span className="value">{user.mobile}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
