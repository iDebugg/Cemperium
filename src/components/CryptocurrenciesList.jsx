import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "../styles/CryptocurrenciesList.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCoinList } from "../controller/assetscontroller";

const CryptocurrenciesList = ({ handleIsLoading }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cryptoAssetsController.coinList);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found in local storage");
        setError("Token not found in local storage");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      if (data.length === 0) {
        handleIsLoading(true);
        setLoading(true);

        try {
          const response = await axios.get(`${process.env.REACT_APP_CRYPTOASSETS_API_URL}`, config);
          dispatch(updateCoinList(response.data.myCoins));
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Error fetching data");
        } finally {
          setLoading(false);
          handleIsLoading(false);
        }
      }
    };

    fetchData();
  }, [data, dispatch, handleIsLoading]);

  if (loading) {
    return (
      <div id="data-container">
        <Skeleton height={40} count={1} />
        <Skeleton height={30} count={5} style={{ marginTop: 10 }} />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (data.length === 0) {
    return <div>No coins available.</div>;
  }

  const formatPrice = (price) => {
    if (!price) return "N/A";
    return parseFloat(price.replace(/[^0-9.-]+/g, "")).toLocaleString();
  };

  const formatPercentage = (percentage) => {
    if (!percentage) return "N/A";
    const value = parseFloat(percentage.replace(/[^0-9.-]+/g, ""));
    return value >= 0 ? `▲ ${value}%` : `▼ ${Math.abs(value)}%`;
  };

  const truncateName = (name) => (name.length > 7 ? name.slice(0, 7) + "..." : name);

  return (
    <div id="data-containerCrpto">
      <h4 className="CryptocurrenciesWord">Cryptocurrencies</h4>
      <div className="header">
        <div className="cell">Coin</div>
        <div className="cell">Price</div>
        <div className="cell">24h</div>
        <div className="cell marketCapp">Market Cap</div>
        <div className="cell">Buy</div>
      </div>
      <div className="scroll-content">
        {data.map((coin) => (
          <div key={coin.assetSymbol} className="row">
            <div className="cell coin-info">
              <img src={coin.assetImage} alt={coin.assetName} />
              <div className="coin-name">
                <div className="assetNameBig">{truncateName(coin.assetName)}</div>
                <div className="miniNameAbbrevations">{coin.assetSymbol}</div>
              </div>
            </div>
            <div className="cell cellStyle"> ${formatPrice(coin.assetMarketPrice)}</div>
            <div
              className={`cell cellStyle ${
                parseFloat(coin.assetPercentChange24h) >= 0
                  ? "positive-change"
                  : "negative-change"
              }`}
            >
              {formatPercentage(coin.assetPercentChange24h)}
            </div>
            <div className="cell cellStyle marketCapp">${formatPrice(coin.assetMarketCap)}</div>
            <div className="cell">
              <button
                className="buy-button"
                aria-label={`Buy ${coin.assetName}`}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptocurrenciesList;
