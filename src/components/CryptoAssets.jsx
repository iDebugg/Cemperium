import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/CryptoAssets.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { updateCoinList } from "../controller/assetscontroller";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CryptoAssets = () => {
  const data = useSelector((state) => state.cryptoAssetsController.coinList);
  const [assetData, setAssetListData] = useState(data);
  const [filteredAssetData, setFilteredAssetData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Create a ref for the input field
  const searchInputRef = useRef(null);

  useEffect(() =>{
    setFilteredAssetData(data)
    setAssetListData(data)
  },[data])

  const formatPrice = (price) => {
    const number = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    return number ? `$${number.toLocaleString()}` : '$0';
  };

  const formatBalance = (balance) => {
    const number = parseFloat(balance.replace(/[^0-9.-]+/g, ""));
    return number ? number.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 }) : '0.0000';
  };

  const calculateBalance = (price, balance) => {
    const priceNumber = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    const balanceNumber = parseFloat(balance.replace(/[^0-9.-]+/g, ""));
    const totalBalance = priceNumber * balanceNumber;
    return totalBalance ? `$${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}` : '$0.0000';
  };

  const truncateName = (name) => {
    return name.length > 3 ? name.slice(0, 3) + '...' : name;
  };

  const handleSearchChange = (e) => {
    const searchWord = e.currentTarget.value;
    setSearchTerm(searchWord);
    const filteredCoins = assetData.filter((asset) => asset.assetName.toLowerCase().includes(searchWord.toLowerCase()));
    setFilteredAssetData(filteredCoins);
  };

  const handleSearchClick = () => {
    setSearchVisible(true);
    // Focus the input field when the search icon is clicked
    setTimeout(() => {
      searchInputRef.current.focus();
    }, 0);
  };

  const handleCancelClick = () => {
    setSearchVisible(false);
    setSearchTerm("");
    setFilteredAssetData(assetData);
  };

  return (
    <div id="data-containerAssets">
      <div className='assetsAndSearchDiv'>
        <span>Assets</span>
        {searchVisible && (
          <>
            <input
              onChange={handleSearchChange}
              type="text"
              className='assetsSearchInput'
              value={searchTerm}
              placeholder="Search for coins..."
              ref={searchInputRef}  // Assign the ref to the input field
            />
            <button
              type="button"
              onClick={handleCancelClick}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <FontAwesomeIcon icon={faTimes} style={{ fontSize: "20px", color: "#B0B1B2" }} />
            </button>
          </>
        )}
        {!searchVisible && (
          <button
            type="button"
            onClick={handleSearchClick}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: "20px", color: "#B0B1B2" }} />
          </button>
        )}
      </div>

      <div className="scroll-content">
        {filteredAssetData.map(coin => (
          <div key={coin.assetSymbol} className="rowAssets">
            <div className="cell coin-infos">
              <img src={coin.assetImage} alt={coin.assetName} />
              <div className="coin-name">
                <div>{coin.assetSymbol}</div>
                <div className='miniNameAbbrevation'>{truncateName(coin.assetName)}</div>
              </div>
            </div>
            <div className="cell coin-infos">
              <div className="coin-name">
                <div>{calculateBalance(coin.assetMarketPrice, coin.assetBalance)}</div>
                <div className='miniNameAbbrevation'>{formatBalance(coin.assetBalance)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CryptoAssets;
