import React, { useState, useEffect } from 'react';
import CemperiumLogo from '../assets/img/Frame 92.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/SlidingNavbar.css";
import MobileLogo from "../assets/img/MobileLogo.png"
import { toast } from 'react-toastify';

const SlidingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('/Home'); // default to Home
  const location = useLocation();
  const navigate = useNavigate();
  



  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = (path) => {
    setActiveMenu(path);
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token")
    console.log("Token removed from local storage")

    toast.success("You have been logged out successfully.")
 

    navigate("/LogIn")
  }


  return (
    <div className="navbar-container">
      {/* Top Navigation Bar */}
      <div className="top-navbar">
        {/* Logo */}
        <div className="logo">
          <img src={MobileLogo} alt="" />
          
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          {/* <button className="search-button">&#10132;</button> */}
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleNavbar}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>

      {/* Full-Screen Overlay */}
      <div className={`overlay ${isOpen ? 'active' : ''}`}>
        <button className="cancel-button" onClick={toggleNavbar}>
          ✕
        </button>
        

        <nav >
        <img src={CemperiumLogo} alt="" className='cemperiumLogoHomePage'/>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className={`nav-link ${activeMenu === '/Home' ? 'active' : ''}`}>
                <Link className="nav-menu-link" to="/Home" onClick={() => handleMenuClick('/Home')}>
                  <i className="fa-solid fa-house icon"></i>
                  <span className="text nav-text">Home</span>
                </Link>
              </li>
              <li className={`nav-link ${activeMenu === '/Activity' ? 'active' : ''}`}>
                <Link className="nav-menu-link" to="/Activity" onClick={() => handleMenuClick('/AcademicCalendar')}>
                  <i className="fa-solid fa-chart-line icon"></i>
                  <span className="text nav-text">Activity</span>
                </Link>
              </li>
              <li className={`nav-link ${activeMenu === '/Wallet' ? 'active' : ''}`}>
                <Link className="nav-menu-link" to="/Wallet" onClick={() => handleMenuClick('/CourseCurriculum')}>
                  <i className="fa-solid fa-history icon"></i>
                  <span className="text nav-text">Wallet</span>
                </Link>
              </li>
              <li className={`nav-link ${activeMenu === '/CryptoCurrency' ? 'active' : ''}`}>
                <Link className="nav-menu-link" to="/CryptoCurrency" onClick={() => handleMenuClick('/CourseMaterials')}>
                  <i className="fa-solid fa-coins icon"></i>
                  <span className="text nav-text">Crytocurrency</span>
                </Link>
              </li>
              <li className={`nav-link ${activeMenu === '/Settings' ? 'active' : ''}`}>
                <Link className="nav-menu-link" to="/Settings" onClick={() => handleMenuClick('/DuePayment')}>
                  <i className="fa-solid fa-gear icon"></i>
                  <span className="text nav-text">Settings</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="bottom-content">
            <ul>
              <li className={`nav-link ${activeMenu === '/' ? 'active' : ''}`}>
                <Link onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket icon"></i>
                  <span className="text nav-text">Log Out</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        </nav>
      </div>
    </div>
  );
};

export default SlidingNavbar;