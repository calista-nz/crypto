import React, { useContext, useEffect, useState } from 'react';

import './Home.css';

import { CoinContext } from '../../context/CoinContext';
import { fetchCoins } from '../../service/coinGeckoApi';
import { Link } from 'react-router-dom';


const Home = () => {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  const { currency } = useContext(CoinContext);

  const loadCoins = async () => {
    try {
      const data = await fetchCoins(currency.name);
      setCoins(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCoins();
  }, [currency]);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">

      <div className="hero">

        <h1>
          Greatest
          <br />
          Crypto Market
        </h1>

        <p>
          Want to know more? Let's Join us
        </p>

        <form onSubmit={(e) => e.preventDefault()}>

          <input
            type="text"
            placeholder="Search crypto.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit">
            Search
          </button>

        </form>

      </div>

      <div className="crypto-table">

        <div className="table-layout">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p>24h</p>
          <p>Market Cap</p>
        </div>

        {filteredCoins.map((coin) => (

          <Link to={`/coin/${coin.id}`}
            className="table-layout"
            key={coin.id}
          >

            <p>{coin.market_cap_rank}</p>

            <div className="coin-name">

              <img
                src={coin.image}
                alt={coin.name}
              />

              <p>{coin.name}</p>

            </div>

            <p>
              {currency.symbol}
              {coin.current_price.toLocaleString()}
            </p>

            <p
              className={
                coin.price_change_percentage_24h == null
                  ? ''
                  : coin.price_change_percentage_24h > 0
                    ? 'green'
                    : 'red'
              }
            >
              {coin.price_change_percentage_24h == null
                ? ''
                : `${coin.price_change_percentage_24h.toFixed(2)}%`}
            </p>

            <p>
              {currency.symbol}
              {coin.market_cap.toLocaleString()}
            </p>

          </Link>

        ))}

        {filteredCoins.length === 0 && (
          <p className="no-results">
            No cryptocurrency found.
          </p>
        )}

      </div>

    </div>
  );
};

export default Home;