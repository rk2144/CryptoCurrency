import React, { useEffect, useState } from 'react';
import Header from './header';
import axios from 'axios';
import { Baseurl } from './baseurl';
import Loader from './loader';
import './exchanges.css';
import { Link } from 'react-router-dom';
import NewsSection from './Newssection';// Import the new NewsSection component

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState([]);
  const [currency, setCurrency] = useState('inr');
  const currencySymbol = currency === 'inr' ? '₹' : '$';
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getCoinsData = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin data", error);
        setLoading(false);
      }
    };

    getCoinsData();
  }, [currency]);

  return (
    <>
      {loading ? <Loader /> : <>
        <Header />
        <div className='search-bar'>
          <input 
            type='text' 
            placeholder='Search your Coins' 
            style={{ height: '2rem', width: '20rem', position: 'absolute', top: '1%', left: '35%', paddingLeft: "5px" }} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <div className='btns'>
          <button onClick={() => setCurrency('inr')}>INR</button>
          <button onClick={() => setCurrency('usd')}>USD</button>
        </div>
        <div>
          {coin.filter((data) => {
            if (data === '')
              return data;
            else if (data.name.toLowerCase().includes(search.toLowerCase()))
              return data;
          }).map((exchange, i) => (
            <CoinCards exchange={exchange} id={exchange.id} currencySymbol={currencySymbol} />
          ))}
        </div>
        <NewsSection /> {/* Add the NewsSection component here */}
      </>}
    </>
  );
};

const CoinCards = ({ exchange, currencySymbol, id }) => {
  const profit = exchange.price_change_percentage_24h > 0;
  return (
    <Link to={`/coins/${id}`} style={{ color: "white", textDecoration: "none" }}>
      <div className='ex-cards'>
        <div className='image'>
          <img src={exchange.image} alt={exchange.name} />
        </div>
        <div className='name'>
          {exchange.name}
        </div>
        <div className='price'>
          {currencySymbol}{exchange.current_price.toFixed(2)}
        </div>
        <div className='rank' style={profit ? { color: "green" } : { color: "red" }}>
          {profit ? "+" + exchange.price_change_percentage_24h.toFixed(2) : exchange.price_change_percentage_24h.toFixed(2)}
        </div>
      </div>
    </Link>
  );
};

export default Coins;
