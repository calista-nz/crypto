import React, { useContext } from 'react';
import './Navbar.css';
import arrow from '../../assets/arrow_icon.png';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (e) => {

    setCurrency({

      name: e.target.value,

      symbol: e.target.value === 'usd'
        ? '$'
        : e.target.value === 'eur'
          ? '€'
          : '¥'

    });

  };

  return (

    <div className="navbar">

      <Link to={'/'}>
        <p>💰</p>

      </Link>


      <ul>
        <Link to={'/'}>
          <li>Home</li>
        </Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>

      </ul>

      <div className="nav-right">

        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="cny">CNY</option>
        </select>
        <button>
          Sign up
          <img
            src={arrow}
            alt="arrow"
          />

        </button>

      </div>

    </div>

  );

};

export default Navbar;