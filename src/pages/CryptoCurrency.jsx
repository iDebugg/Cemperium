// Activity.js

import React, { useState, useEffect } from 'react';
import CemperiumLogo from '../assets/img/Frame 92.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMagnifyingGlass, faMessage, faBell } from '@fortawesome/free-solid-svg-icons';
import ProfilePic from '../assets/img/Goldigger Baby NFT 1.png';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/Wallet.css';
import '../styles/CryptoCurrency.css'
import CryptocurrencyListCryptocurrencyPage from '../components/CryptocurrencyListCryptocurrencyPage';
import { toast } from 'react-toastify';
import SlidingNavbar from '../components/SlidingNavbar';


function CryptoCurrency() {
  const [activeMenu, setActiveMenu] = useState('/CryptoCurrency');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = (path) => {
    setActiveMenu(path);
  };
  const handleLogout = () => {
    localStorage.removeItem("token")
    console.log("Token removed from local storage")

    toast.success("You have been logged out successfully.")

    navigate("/LogIn")
  }

  return (
    <div className='homePageBackground'>
         <SlidingNavbar />
      <div className='sideBar'>
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
                <Link className="nav-menu-link" to="/Activity" onClick={() => handleMenuClick('/Activity')}>
                  <i className="fa-solid fa-chart-line icon"></i>
                  <span className="text nav-text">Activity</span>
                </Link>
              </li>
              <li className={`nav-link ${activeMenu === '/Wallet' ? 'active' : ''}`}>
                <Link className="nav-menu-link" to="/Wallet" onClick={() => handleMenuClick('/CourseCurriculum')}>
                <i class="fa-solid fa-wallet icon"></i>
                  <span className="text nav-text">Wallet</span>
                </Link>
              </li>
              <li className={`nav-link ${activeMenu === '/CryptoCurrency' ? 'active' : ''}`}>
                <Link className="nav-menu-link" to="/CryptoCurrency" onClick={() => handleMenuClick('/CourseMaterials')}>
                  <i className="fa-solid fa-coins icon"></i>
                  <span className="text nav-text">Cryptocurrency</span>
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
      </div>

      <div className='homePageDisplayDiv'>
        <div className='searchDiv'>
          <div>
            <input type="text" name="search" id="" placeholder='search for anything...' className='searchInput' />
            <button
              type="button"
              style={{
                position: 'absolute',
                top: '4.6%',
                transform: 'translateY(-50%)',
                left: '600px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <FontAwesomeIcon icon={faArrowRight}
                style={{ fontSize: "20px", color: "#B0B1B2", background: "white", width: "30px", height: "30px", borderRadius: "10px" }} />
            </button>
            <button
              type="button"
              style={{
                position: 'absolute',
                top: '4.6%',
                transform: 'translateY(-50%)',
                left: '350px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass}
                style={{ fontSize: "20px", color: "#B0B1B2", marginRight: "20px" }} />
            </button>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              style={{
                position: 'absolute',
                top: '4.6%',
                transform: 'translateY(-50%)',
                right: '140px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <FontAwesomeIcon icon={faMessage}
                style={{ fontSize: "30px", color: "#B0B1B2", marginRight: "20px" }} />
            </button>
          
            <button
              type="button"
              style={{
                position: 'absolute',
                top: '4.6%',
                transform: 'translateY(-50%)',
                right: '100px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <FontAwesomeIcon icon={faBell}
                style={{ fontSize: "34px", color: "#B0B1B2", marginRight: "20px" }} />
            </button>
         
            <img src={ProfilePic} alt="" className='profilePicImg' />
          </div>
        </div>

        <div className='CryptoPageDiv'>
          <h2>Popular cryptocurrencies by market cap</h2>
          {/* <div className='PolularCryptoSearch'>
            <input type="text" name="search" id="" placeholder='search for anything...' className='CryptoPagesearchInput' />
            <button
              type="button"
              style={{
                position: 'absolute',
                top: '38%',
                transform: 'translateY(-50%)',
                left: '1160px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <FontAwesomeIcon icon={faArrowRight}
                style={{ fontSize: "20px", color: "#B0B1B2", background: "#F1F1F1", width: "30px", height: "30px", borderRadius: "5px" }} />
            </button>
            <button
              type="button"
              style={{
                position: 'absolute',
                top: '38%',
                transform: 'translateY(-50%)',
                left: '910px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass}
                style={{ fontSize: "20px", color: "#B0B1B2", marginRight: "20px" }} />
            </button>
          </div> */}
        <div className='CryptocurrenciesPg'> <CryptocurrencyListCryptocurrencyPage/></div>
        
       
         
         
        </div>
      </div>
    </div>
  );
}

export default CryptoCurrency;