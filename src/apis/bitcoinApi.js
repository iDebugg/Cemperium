// src/api.js
import axios from 'axios';

export const fetchBitcoinData = async (days) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
      params: {
        vs_currency: 'usd',
        days: days, // data for the specified number of days
      },
    });
    return response.data.prices;
  } catch (error) {
    console.error("Error fetching Bitcoin data:", error);
    return [];
  }
};

export const fetchCurrentPrice = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin',
        vs_currencies: 'usd',
      },
    });
    return response.data.bitcoin.usd;
  } catch (error) {
    console.error("Error fetching current Bitcoin price:", error);
    return null;
  }
};
