import React, { useContext, useEffect, useState } from 'react';

import './Coin.css';

import { useParams } from 'react-router-dom';

import { CoinContext } from '../../context/CoinContext';

import {
  fetchCoinDetails,
  fetchMarketChart
} from '../../service/coinGeckoApi';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Coin = () => {

  const { coinId } = useParams();

  const { currency } = useContext(CoinContext);

  const [coin, setCoin] = useState(null);
  const [chart, setChart] = useState([]);

  const loadCoin = async () => {

    try {

      const coinData = await fetchCoinDetails(coinId);

      const chartData = await fetchMarketChart(
        coinId,
        currency.name
      );

      setCoin(coinData);
      setChart(chartData.prices);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadCoin();

  }, [coinId, currency]);

  if (!coin) {
    return (
      <div className="coin-loading">
        Loading...
      </div>
    );
  }

  const chartData = chart.map(([time, price]) => ({
    time: new Date(time).toLocaleDateString(),
    price
  }));

  return (
    <div className="coin">

      <div className="coin-header">

        <img
          src={coin.image.large}
          alt={coin.name}
        />

        <div>
          <h1>{coin.name}</h1>
          <p>{coin.symbol.toUpperCase()}</p>
        </div>

      </div>

      <div className="coin-price">

        <h2>
          {currency.symbol}
          {coin.market_data.current_price[
            currency.name
          ].toLocaleString()}
        </h2>

        <p
          className={
            coin.market_data.price_change_percentage_24h > 0
              ? 'green'
              : 'red'
          }
        >
          {coin.market_data.price_change_percentage_24h != null
            ? `${coin.market_data.price_change_percentage_24h.toFixed(2)}%`
            : ''}
        </p>

      </div>

      <div className="coin-chart">

        <h3>Price Chart</h3>

        <ResponsiveContainer width="100%" height={400}>

          <LineChart data={chartData}>

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="price"
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      <div className="coin-stats">

        <div>
          <p>Market Cap</p>

          <h3>
            {currency.symbol}
            {coin.market_data.market_cap[
              currency.name
            ].toLocaleString()}
          </h3>
        </div>

        <div>
          <p>24h Volume</p>

          <h3>
            {currency.symbol}
            {coin.market_data.total_volume[
              currency.name
            ].toLocaleString()}
          </h3>
        </div>

        <div>
          <p>Market Cap Rank</p>

          <h3>
            #{coin.market_cap_rank}
          </h3>
        </div>

      </div>

    </div>
  );
};

export default Coin;