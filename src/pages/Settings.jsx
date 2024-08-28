import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMagnifyingGlass, faMessage, faBell } from '@fortawesome/free-solid-svg-icons';
import ProfilePic from '../assets/img/Goldigger Baby NFT 1.png';
import '../styles/Settings.css'
import CemperiumLogoSettings from '../assets/img/Logo.png'
import bitcoingImg from '../assets/img/bitcoin 1.png'
import SettingsBitcoinChart from '../components/SettingsBitcoinChart';
import { useNavigate } from 'react-router-dom';
import SlidingNavbar from '../components/SlidingNavbar';
import TradeSwitch from '../buyAndSellLogic/TradeSwitch';

function Settings() {
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate(-1);
  }
  return (
    <div className="settingsBg">
      <SlidingNavbar />
    <div className='SettingsearchDiv'>
        <img src={CemperiumLogoSettings} alt="" className='CemperiumLogoSettings'/>
          <div>
            <input type="text" name="search" id="" placeholder='search for anything...' className='SettingssearchInput' />
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
         
            <img src={ProfilePic} alt="" className='SettingsprofilePicImg' />
          </div>
        </div>
        <div className='backBTNDiv'>
        <button onClick={handleBackBtn}><i class="fa-solid fa-arrow-left"></i>Back</button>
        </div>
        
        
        <div className='bitcoinPriceAndImgDiv'>
        <img src={bitcoingImg} alt="" className='bitcoingImg-settings' />
        <h1 className="chart-title-settings"> BTC  <span>Bitcoin Price</span></h1>
      </div>

        <div className='SettingsBitcoinChartBuyAndSell'>
            <div className='BitchoinCharrtDiv'>
         
                <SettingsBitcoinChart />
                <div className='bitcoinMarketInfo'>
                    <div className='bitcoinMarketInfoBoxOnes'> <TradeSwitch /></div>
                    <div className='bitcoinMarketInfoBoxOness'>
                      <h4>Bitcoin Market Information</h4>
                    </div>
                    <div className='bitcoinMarketInfoBoxOne'></div>
                </div>
            </div>
            <div className='BuyAndSell'>
            
                <div className='BuyAndSellBoxOnes'> <TradeSwitch /></div>
                    <div className='BuyAndSellBoxOne'>
                        <h4>History</h4>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Settings