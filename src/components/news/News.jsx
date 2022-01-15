import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './news.css';

import EachNews from './EachNews';
import { newsCategory } from './newsCategory';
import Loading from '../loading/Loading';
import Draggable from 'react-draggable';
const News = () => {
  const [news, setNews] = useState();
  const [category, setCategory] = useState(newsCategory[0]);
  const [pin, setPin] = useState(true);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_RAPID_API;

  const config_data = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news',
    params: {
      textFormat: 'Raw',
      safeSearch: 'Off',
      mkt: 'en-US',
      originalImg: 'true',
      category: category.category,
    },
    headers: {
      'x-bingapis-sdk': 'true',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
      'x-rapidapi-key': API_KEY,
    },
  };

  const getNews = async () => {
    try {
      const res = await axios(config_data);

      setNews(res.data.value);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNews();
  }, [category]);

  const handleClick = (cate) => {
    setLoading(true);
    setCategory(cate);
  };

  console.log(news);
  return (
    <Draggable handle="strong">
      <div className="newsWrapper box no-cursor">
        <strong className="cursor">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="20px"
          >
            <path d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" />
          </svg>
        </strong>
        <h1>News: {category.name}</h1>
        <div className="newsCategory">
          {newsCategory.map((item) => {
            return (
              <button
                className="catButton"
                key={item.name}
                onClick={() => handleClick(item)}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="newsScroll">
          {loading ? (
            <Loading width={'50px'} height={'50px'} />
          ) : (
            <div className="newsWrap">
              {news &&
                news.map((item, index) => {
                  return <EachNews newss={item} key={index} />;
                })}
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default News;
