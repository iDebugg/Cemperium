import React, { useState, useEffect } from "react";
import "../styles/TradeSwitch.css";
import { useSelector } from "react-redux";


const TradeSwitch = () => {
    const [action, setAction] = useState('buy');
    const [payAmount, setPayAmount] = useState('');
    const [receiveAmount, setReceiveAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    // Select the coinList from Redux store
    const coinList = useSelector(state => state.cryptoAssetsController.coinList);
  
    // Get USDT and BTC data
    const usdtCoin = coinList.find(coin => coin.assetSymbol === 'USDT');
    const btcCoin = coinList.find(coin => coin.assetSymbol === 'BTC');
  
    const selectedCoin = action === 'buy' ? usdtCoin : btcCoin;
  
    useEffect(() => {
      setPayAmount('');
      setReceiveAmount('');
      setErrorMessage('');
    }, [action]);
  
    const handleSwitch = (newAction) => {
      setAction(newAction);
    };
  
    const handlePayAmountChange = (e) => {
      const value = e.target.value;
      setPayAmount(value);
  
      if (usdtCoin && btcCoin) {
        const marketPrice = parseFloat(btcCoin.assetMarketPrice.replace(/[^0-9.-]+/g, ""));
        const conversionRate = action === 'buy' ? 1 / marketPrice : marketPrice;
  
        const newReceiveAmount = value * conversionRate;
        setReceiveAmount(newReceiveAmount.toFixed(8)); // Fixed to 8 decimal places
  
        const availableBalance = parseFloat(selectedCoin.assetBalance);
        if (value > availableBalance) {
          setErrorMessage(`Insufficient balance. Available: ${availableBalance} ${selectedCoin.assetSymbol}`);
        } else {
          setErrorMessage('');
        }
      }
    };
  
    return (
      <div className="trade-container">
        <div className="trade-buttons">
          <button
            className={`trade-button ${action === 'buy' ? 'active' : ''}`}
            onClick={() => handleSwitch('buy')}
          >
            Buy
          </button>
          <button
            className={`trade-button ${action === 'sell' ? 'active' : ''}`}
            onClick={() => handleSwitch('sell')}
          >
            Sell
          </button>
        </div>
        <div className={`trade-form ${action}`}>
          {usdtCoin && btcCoin && (
            <>
              <div className="trade-input-container">
                <div className="trade-input-wrapper">
                <label className="trade-input-label">You'll pay</label>
                  <input
                    type="text"
                    value={payAmount}
                    onChange={handlePayAmountChange}
                    placeholder="0.0000"
                    className="trade-input no-arrows"
                  />
                  <div className="trade-input-addon">
                    <img src={action === 'buy' ? usdtCoin.assetImage : btcCoin.assetImage} alt="Coin logo" className="coin-logo" />
                    <span>{action === 'buy' ? 'USDT' : 'BTC'}</span>
                  </div>
                </div>
                <p className="available-balance">Available: {selectedCoin.assetBalance} {selectedCoin.assetSymbol}</p>
              </div>
              <div className="trade-input-container">
                <div className="trade-input-wrapper">
                <label className="trade-input-label">You'll receive</label>
                  <input
                    type="text"
                    value={receiveAmount}
                    placeholder="0.0000"
                    readOnly
                    className="trade-input"
                  />
                  <div className="trade-input-addon">
                    <img src={action === 'buy' ? btcCoin.assetImage : usdtCoin.assetImage} alt="Coin logo" className="coin-logo" />
                    <span>{action === 'buy' ? 'BTC' : 'USDT'}</span>
                  </div>
                </div>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button
                className="trade-submit-button"
                disabled={!!errorMessage}
              >
                {action === 'buy' ? 'Buy' : 'Sell'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };
  
  
export default TradeSwitch;

