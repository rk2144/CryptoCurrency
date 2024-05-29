import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './newsSection.css';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get('https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=YOUR_NEWS_API');
        setNews(data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news data", error);
        setLoading(false);
      } 
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading news...</div>;
  }

  return (
    <div className='news-section'>
      <h2>Latest Cryptocurrency News</h2>
      {news.map((article, index) => (
        <div className='news-article' key={index}>
          <h3><a href={article.url} target='_blank' rel='noopener noreferrer'>{article.title}</a></h3>
          <p>{article.description}</p>
          <span>{new Date(article.publishedAt).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default NewsSection;
