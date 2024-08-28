// src/BitcoinChart.js
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { fetchBitcoinData, fetchCurrentPrice } from '../apis/bitcoinApi.js';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/SettingsBitcoinChart.css'
import CustomTooltip from '../components/CustomTooltip.jsx'
import bitcoingImg from '../assets/img/bitcoin 1.png'
import {
  updateBitcoinData,
  updateCurrentBitcoinPrice,
  updateTimeFrame,
} from '../controller/assetscontroller';

const timeFrames = {
  hour: 1 / 24,
  day: 1,
  week: 7,
  month: 30,
  year: 365,
};

const formatPrice = (price) => `${(price / 1000).toFixed(2)}k`;

const formatXAxisDate = (date) => new Date(date).toLocaleString('default', { month: 'short' });

const formatTooltipDate = (date) => new Date(date).toISOString(); // Use ISO string format

const SettingsBitcoinChart = () => {
  const dispatch = useDispatch();
  const bitcoinData = useSelector((state) => state.cryptoAssetsController.bitcoinData);
  const currentPrice = useSelector((state) => state.cryptoAssetsController.currentBitcoinPrice);
  const timeFrame = useSelector((state) => state.cryptoAssetsController.timeFrame);

  useEffect(() => {
    const getData = async () => {
      if (!bitcoinData.length) {
        const days = timeFrames[timeFrame];
        const fetchedData = await fetchBitcoinData(days);
        const formattedData = fetchedData.map((item) => {
          const date = new Date(item[0]);
          return {
            date: date,
            formattedDate: formatXAxisDate(date),
            tooltipDate: formatTooltipDate(date),
            price: item[1],
          };
        });
        dispatch(updateBitcoinData(formattedData)); // Dispatch to Redux
      }
    };

    const getCurrentPrice = async () => {
      if (currentPrice === null) {
        const price = await fetchCurrentPrice();
        dispatch(updateCurrentBitcoinPrice(price)); // Dispatch to Redux
      }
    };

    getData();
    getCurrentPrice();
  }, [timeFrame, dispatch, bitcoinData, currentPrice]);

  const handleTimeFrameChange = (key) => {
    dispatch(updateTimeFrame(key));
  };

  return (
    <div className="chart-container-settings">
      <div className='marketOverviewAndFrameSelector-settings'>
      {currentPrice !== null && (
        <h2 className="current-price-settings"> ${currentPrice.toLocaleString()}</h2>
      )}
        <div className="time-frame-selector-settings">
          {Object.keys(timeFrames).map((key) => (
            <button
              key={key}
              className={`time-frame-button-settings ${timeFrame === key ? 'active-settings' : ''}`}
              onClick={() => handleTimeFrameChange(key)}
            >
              {key.charAt(0).toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    
      <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={bitcoinData}>
          <defs>
            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#66a6ff" stopOpacity={0.8} />
              <stop offset="90%" stopColor="#66a6ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} horizontal={false} /> {/* Hide grid lines */}
          <XAxis dataKey="formattedDate" />
          <YAxis tickFormatter={formatPrice} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#66a6ff"
            fill="url(#colorBlue)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SettingsBitcoinChart;
