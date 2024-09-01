import React, { useEffect, useState, Suspense, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/CrpytoAssetsWalletPage.css';

const CryptoAssetsWalletPage = () => {
  const data = useSelector((state) => state.cryptoAssetsController.coinList);
  const [assets, setAssets] = useState(data);
  const [filteredAssets, setFilteredAssets] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Create a ref for the input field
  const searchInputRef = useRef(null);

  const handleSearchChange = (e) => {
    const searchWord = e.currentTarget.value;
    setSearchTerm(searchWord);
    const filteredCoins = assets.filter((asset) => asset.assetName.toLowerCase().includes(searchWord.toLowerCase()));
    setFilteredAssets(filteredCoins);
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
    setFilteredAssets(assets);
  };

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

  const truncateText = (text) => {
    return text.length > 3 ? text.slice(0, 3) : text;
  };

  return (
    <div className="assets-containerWallets">
      <div className="assets-headerWallets">
        <h2>Assets</h2>
        {searchVisible && (
          <>
            <input
              onChange={handleSearchChange}
              type="text"
              className='assetsSearchInputWallets'
              value={searchTerm}
              placeholder="Search for coins..."
              ref={searchInputRef} // Assign the ref to the input field
            />
            <button
              type="button"
              onClick={handleCancelClick}
              className='search-cancel-buttonWallets'
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </>
        )}
        {!searchVisible && (
          <button
            type="button"
            onClick={handleSearchClick}
            className='search-buttonWallets'
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        )}
      </div>
      {loading ? (
        <Skeleton count={7} height={50} />
      ) : (
        <Suspense fallback={<Skeleton count={7} height={50} />}>
          {error ? (
            <div>{error}</div>
          ) : (
            <div className="assets-body-containerWallets">
              <table className="assets-tableWallets">
                <thead>
                  <tr>
                    <th className="left-alignWallets">Assets</th>
                    <th className="center-alignWallets">Holdings</th>
                    <th className="right-alignWallets">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map((coin) => (
                    <tr key={coin.assetSymbol}>
                      <td className="left-alignWallets">
                        <img src={coin.assetImage} alt={coin.assetName} className="coin-imageWallets" />
                        <div className="coin-nameWallets">
                          <div>{truncateText(coin.assetSymbol)}</div>
                          <div className='miniNameAbbrevationWallets'>{truncateText(coin.assetName)}</div>
                        </div>
                      </td>
                      <td className="center-alignWallets">{formatBalance(coin.assetBalance)}</td>
                      <td className="right-alignWallets">{calculateBalance(coin.assetMarketPrice, coin.assetBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Suspense>
      )}
    </div>
  );
};

export default CryptoAssetsWalletPage;
