import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import '../styles/CryptocurrencyListCryptocurrencyPage.css';
import { useSelector } from 'react-redux';
const   CryptocurrencyListCryptocurrencyPage = () => {
  
   
    const [error, setError] = useState(null);
    const data = useSelector((state)=>state.cryptoAssetsController.coinList)



    // if (loading) {
    //     return (
    //         <div id="data-container" className="cryptocurrencyPage-data-container">
    //             <h4 className='cryptocurrencyPage-CryptocurrenciesWord'>Cryptocurrencies</h4>
    //             <Skeleton height={40} count={1} />
    //             <Skeleton height={30} count={5} style={{ marginTop: 10 }} />
    //         </div>
    //     );
    // }

    if (error) {
        return <div>{error}</div>;
    }

    if (data.length === 0) {
        return <div>No coins available.</div>;
    }

    const formatPrice = (price) => {
        return parseFloat(price.replace(/[^0-9.-]+/g, "")).toLocaleString();
    };

    const formatPercentage = (percentage) => {
        const value = parseFloat(percentage.replace(/[^0-9.-]+/g, ""));
        return value >= 0 ? `▲ ${value}%` : `▼ ${Math.abs(value)}%`;
    };

    const truncateName = (name) => {
        return name.length > 9 ? name.slice(0, 9) + '...' : name;
    };

    return (
        
        <div id="data-container" className="cryptocurrencyPage-data-container">
            <h4 className='cryptocurrencyPage-CryptocurrenciesWord'>Cryptocurrencies</h4>
            <div className="cryptocurrencyPage-header">
                <div className="cryptocurrencyPage-cell cryptocurrencyPage-coin-header">Coin</div>
                <div className="cryptocurrencyPage-cell cryptocurrencyPage-center">Price</div>
                <div className="cryptocurrencyPage-cell cryptocurrencyPage-center">24h</div>
                <div className="cryptocurrencyPage-cell cryptocurrencyPage-center marketCapp">Market Cap</div>
                <div className="cryptocurrencyPage-cell cryptocurrencyPage-buy-header">Buy</div>
            </div>
            <div className="cryptocurrencyPage-scroll-content">
                {data.map(coin => (
                    <div key={coin.assetSymbol} className="cryptocurrencyPage-row">
                        <div className="cryptocurrencyPage-cell cryptocurrencyPage-coin-info">
                            <img src={coin.assetImage} alt={coin.assetName} className="cryptocurrencyPage-coin-image" />
                            <div className="cryptocurrencyPage-coin-name">
                                <div className='assetNameBig'>{truncateName(coin.assetName)}</div>
                                <div className='miniNameAbbrevations'>{coin.assetSymbol}</div>
                            </div>
                        </div>
                        <div className="cryptocurrencyPage-cell cryptocurrencyPage-center cellStyle">${formatPrice(coin.assetMarketPrice)}</div>
                        <div className={`cryptocurrencyPage-cell cryptocurrencyPage-center cellStyle ${parseFloat(coin.assetPercentChange24h) >= 0 ? 'cryptocurrencyPage-positive-change' : 'cryptocurrencyPage-negative-change'}`}>
                            {formatPercentage(coin.assetPercentChange24h)}
                        </div>
                        <div className="cryptocurrencyPage-cell cryptocurrencyPage-center marketCapp">${formatPrice(coin.assetMarketCap)}</div>
                        <div className="cryptocurrencyPage-cell cryptocurrencyPage-buy-cell">
                            <button className="cryptocurrencyPage-buy-button" aria-label={`Buy ${coin.assetName}`}>Buy</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CryptocurrencyListCryptocurrencyPage;
