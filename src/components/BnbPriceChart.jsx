// src/components/BnbPriceChart.js

import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import '../styles/BnbPriceChart.css';
import bnbLogo from '../assets/img/Binance Coin.png'; // Add your BNB logo image to the src/components folder

// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import {
  updateBnbPrice,
  updateBnbPriceChange,
  updateBnbChartData
} from '../controller/assetscontroller';  // Import actions

const BnbPriceChart = () => {
  // Redux dispatch
  const dispatch = useDispatch();

  // Fetch BNB data from Redux store
  const price = useSelector((state) => state.cryptoAssetsController.bnbPrice);
  const priceChange = useSelector((state) => state.cryptoAssetsController.bnbPriceChange);
  const chartData = useSelector((state) => state.cryptoAssetsController.bnbChartData);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/binancecoin/market_chart?vs_currency=usd&days=1');
        const prices = response.data.prices;

        const labels = prices.map(price => new Date(price[0]).toLocaleTimeString());
        const data = prices.map(price => price[1]);

        const newPrice = data[data.length - 1];
        const lastPrice = data.length > 1 ? data[data.length - 2] : newPrice;

        // Dispatch actions to update the Redux store
        dispatch(updateBnbPrice(newPrice));
        dispatch(updateBnbPriceChange(((newPrice - lastPrice) / lastPrice) * 100));

        dispatch(updateBnbChartData({
          labels,
          datasets: [
            {
              label: 'Price',
              data,
              borderColor: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 2,
              tension: 0.4,
              fill: false,
              pointRadius: 0,
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);

    return () => clearInterval(interval);
  }, [dispatch]); // Include dispatch in the dependency array

  return (
    <div className="bnb-price-chart">
      <div className="bnb-info-container">
        <div className="bnb-price-info">
          <img src={bnbLogo} alt="BNB Logo" className="bnb-logo" />
          <div className="bnb-price">${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div className={`price-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
          {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
        </div>
      </div>
      <div className="bnb-chart-container">
        <Line data={chartData} options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
          elements: {
            line: {
              borderWidth: 2,
            },
          },
        }} />
      </div>
    </div>
  );
};

export default BnbPriceChart;
