import React, { useEffect, useState } from 'react';
import Header from './header';
import axios from 'axios';
import { Baseurl } from './baseurl';
import { TbFlagSearch } from 'react-icons/tb';
import Loader from './loader';
import './exchanges.css';
import OurModel from './OurModels';

const Exchange = () => {
    const [loading, setLoading] = useState(true);
    const [exchanges, setExchanges] = useState([]);

    useEffect(() => {
        const getExchangesData = async () => {
            try {
                const { data } = await axios.get(`${Baseurl}/exchanges`);
                console.log(data);
                setExchanges(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching exchange data", error);
                setLoading(false);
            }
        };

        getExchangesData();
    }, []);

    return (
        <>
            {loading ? <Loader /> : <>
                <Header />
                <OurModel/>
                <div>
                    {exchanges.map((exchange) => {
                        return (
                            <div className='ex-cards' key={exchange.id}>
                                <div className='image'>
                                    <img src={exchange.image} alt={exchange.name} />
                                </div>
                                <div className='name'>
                                    {exchange.name}
                                </div>
                                <div className='price'>
                                    {exchange.trade_volume_24h_btc && exchange.trade_volume_24h_btc.toFixed(2)}
                                </div>
                                <div className='rank'>
                                    {exchange.trust_score_rank}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </>}
        </>
    );
}

export default Exchange;
