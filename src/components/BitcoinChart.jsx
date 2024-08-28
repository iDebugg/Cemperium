// src/BitcoinChart.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { fetchBitcoinData, fetchCurrentPrice } from "../apis/bitcoinApi.js";
import "../styles/BitcoinChart.css";
import CustomTooltip from "../components/CustomTooltip.jsx";
import bitcoinImg from "../assets/img/bitcoin 1.png";
import {
  updateBitcoinData,
  updateCurrentBitcoinPrice,
  updateTimeFrame,
} from "../controller/assetscontroller";

const timeFrames = {
  hour: 1 / 24,
  day: 1,
  week: 7,
  month: 30,
  year: 365,
};

const formatPrice = (price) => {
  return `${(price / 1000).toFixed(2)}k`;
};

const formatXAxisDate = (date) => {
  return new Date(date).toLocaleString("default", { month: "short" });
};

const formatTooltipDate = (date) => new Date(date).toISOString(); // Use ISO string format

const BitcoinChart = () => {
  const dispatch = useDispatch();
  const bitcoinData = useSelector((state) => state.cryptoAssetsController.bitcoinData);
  const currentPrice = useSelector((state) => state.cryptoAssetsController.currentBitcoinPrice);
  const timeFrame = useSelector((state) => state.cryptoAssetsController.timeFrame);

  useEffect(() => {
    if (bitcoinData.length === 0 || currentPrice === null) {
      const getData = async () => {
        const days = timeFrames[timeFrame];
        const bitcoinData = await fetchBitcoinData(days);
        const formattedData = bitcoinData.map((item) => {
          const date = new Date(item[0]);
          return {
            date: date,
            formattedDate: formatXAxisDate(date), // Short date for x-axis
            tooltipDate: formatTooltipDate(date), // Full date and time for tooltip
            price: item[1],
          };
        });
        dispatch(updateBitcoinData(formattedData)); // Dispatch to Redux
      };

      const getCurrentPrice = async () => {
        const price = await fetchCurrentPrice();
        dispatch(updateCurrentBitcoinPrice(price)); // Dispatch to Redux
      };

      getData();
      getCurrentPrice();
    }
  }, [timeFrame, dispatch, bitcoinData.length, currentPrice]);

  const handleTimeFrameChange = (key) => {
    dispatch(updateTimeFrame(key));
  };

  return (
    <div className="chart-container">
      <div className="marketOverviewAndFrameSelector">
      <div  className="bitcoinImgDspMobile">
        <img src={bitcoinImg} alt="" className="bitcoingImg" />
        <h1 className="chart-title">Bitcoin Price (BTC)</h1>
      </div>
        <h6 className="marketOverviewText">Market Overview</h6>
        <div className="time-frame-selector">
          {Object.keys(timeFrames).map((key) => (
            <button
              key={key}
              className={`time-frame-button ${timeFrame === key ? "active" : ""}`}
              onClick={() => handleTimeFrameChange(key)}
            >
              {key.charAt(0).toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="bitcoinImgDspLarge">
        <img src={bitcoinImg} alt="" className="bitcoingImg" />
        <h1 className="chart-title">Bitcoin Price (BTC)</h1>
      </div>

      {currentPrice !== null && (
        <h2 className="current-price"> ${currentPrice.toLocaleString()}</h2>
      )}

      <ResponsiveContainer width="100%" height={160}>
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

export default BitcoinChart;
