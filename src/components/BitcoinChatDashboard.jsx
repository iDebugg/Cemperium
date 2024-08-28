import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AreaChart, Area, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { fetchBitcoinData, fetchCurrentPrice } from '../apis/bitcoinApi.js';
import '../styles/BitcoinChart.css';
import CustomTooltip from '../components/CustomTooltip.jsx';
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

const BitcoinChatDashboard = () => {
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
    <div className='bitcoindashboard'>
      <ResponsiveContainer width="100%" height={190}>
        <AreaChart data={bitcoinData}>
          <defs>
            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="#ffff" stopOpacity={0.3} />
              <stop offset="90%" stopColor="#ffff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} horizontal={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#ffff"
            fill="url(#colorBlue)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="marketOverviewAndFrameSelector">
        <div className="time-frame-selectorDasboard">
          {Object.keys(timeFrames).map((key) => (
            <button
              key={key}
              className={`time-frame-buttonDasboard ${timeFrame === key ? 'active' : ''}`}
              onClick={() => handleTimeFrameChange(key)}
            >
              {key.charAt(0).toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BitcoinChatDashboard;
