import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Baseurl } from './baseurl';
import Loader from './loader';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { IoPulseOutline } from 'react-icons/io5';
import './coinsDetails.css';  
import CoinChart from './CoinChart';

const CoinsDetails = () => {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [currency,setCurrency]=useState('inr');
  const currencySymbol = currency === 'inr' ? '₹' : '$';
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/coins/${id}`);
        console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin data", error);
        setLoading(false);
      }
    };

    getCoin();
  }, [id]);

  const handleFavorite = () => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter(fav => fav !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return <Loader />;
  }

  if (!coin) {
    return <div>Error loading coin data</div>;
  }

  const profit = coin.market_data.price_change_percentage_24h > 0;
  const isFavorite = favorites.includes(id);

  return (
    <div className='coin-details' style={{display:'flex',justifyContent:'space-evenly'}}>
      <div className='coin-info'>
        <div className='btns'>
          <button onClick={() => setCurrency('inr')}>INR</button>
          <button onClick={() => setCurrency('usd')}>USD</button>
        </div>
        <div className='time'>
          {new Date(coin.last_updated).toLocaleString()}
        </div>
        <div className='coin-image'>
          <img height='120px' src={coin.image.large} alt={coin.name} />
        </div>
        <div className='coin-name'>
          {coin.name}
        </div>
        <div className='coin-price'>
          {currencySymbol} {coin.market_data.current_price[currency]}
        </div>
        <div className={`coin-profit ${profit ? 'profit' : 'loss'}`}>
          {profit ? <BiSolidUpArrow color='green' /> : <BiSolidDownArrow color='red'/>}
          {coin.market_data.price_change_percentage_24h }%
        </div>
        <div className='market-rank'>
          <IoPulseOutline color='orange'/>
          #{coin.market_cap_rank}
        </div>
        <div className='coin-stats'>
          <div>Market Cap: {currencySymbol} {coin.market_data.market_cap[currency]}</div>
          <div>Circulating Supply: {coin.market_data.circulating_supply}</div>
          <div>Total Volume: {currencySymbol} {coin.market_data.total_volume[currency]}</div>
          <div>Highest in 24h: {currencySymbol} {coin.market_data.high_24h[currency]}</div>
          <div>Lowest in 24h: {currencySymbol} {coin.market_data.low_24h[currency]}</div>
        </div>
        <div className='coin-desc'>
          {coin.description['en'].split('.')[0]}
        </div>
        <button onClick={handleFavorite} className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
      <CoinChart currency={currency}/>
    </div>
  );
};

export default CoinsDetails;
