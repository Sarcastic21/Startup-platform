import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/RegisterPage';
import Login from './components/LoginPage';
import Account from './components/AccountPage';
import HomePage from './components/HomePage';
import DetailPage from './components/DetailPage';
import UIUX from './components/UIUX';
import ThreeD from './components/Aiml'; // Assuming the 3D page component
import WebDesign from './components/Web'; // Assuming the Web Design page component
import AppDesign from './components/App'; // Assuming the App Design page component
import UserProfilePage from './components/UserProfilePage';
import Footer from './components/Footer';
import Forgot from './components/Forgot';
import Invester from './components/Invester';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/card/:id" element={<DetailPage />} /> {/* This is the route for the card details page */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgot />} />
<Route path='/investor-profile' element={<Invester/>}/>
        <Route path="/account" element={<Account />} />
        <Route path="/uiux" element={<UIUX />} />
        <Route path="/ai-ml" element={<ThreeD />} />
        <Route path="/web" element={<WebDesign />} />
        <Route path="/app" element={<AppDesign />} />
        <Route path="/user/:userId" element={<UserProfilePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
